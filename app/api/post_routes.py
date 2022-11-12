from flask import Blueprint, jsonify, request, redirect
from flask_login import current_user, login_required
from app.models import Post, Comment, User, Media, db
from app.models.like import likes
from app.forms.post_form import PostForm
from app.forms.media_form import MediaForm
from app.forms.comment_form import CommentForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    """
    Queries for all posts and all associated data
    and returns it in a list of dictionaries
    in reverse chronological order
    """
    # Query for all posts and all associated data
    posts = Post.query.order_by(Post.created_at.desc()).options(joinedload(Post.author), joinedload(
        Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
    following_list = []
    if current_user.get_id():
        following_list = current_user.following.all()

    # For each post,
    # We need to know if the current user is following them
        # We need to know if the author of the post is in the current user's following list

    response = {
        "Posts": []
    }
    for post in posts:
        post_dict = post.to_dict()
        post_dict['Media'] = [media.to_dict() for media in post.media]
        post_dict['notes'] = len(post.comments) + len(post.user_likes)
        post_author_dict = post.author.to_dict()
        post_dict['User'] = {
            "id": post_author_dict['id'],
            "username": post_author_dict['username'],
            "profileImageUrl": post_author_dict['profile_image_url'],
            "following": post.author in following_list
        }

        response["Posts"].append(post_dict)

    return response


@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
    """
    Creates a post and validates the submission,
    and returns the new post in a dictionary
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_post = Post(
            user_id=current_user.get_id(),
            post_type=form.data['postType'],
            title=form.data['title'],
            text=form.data['text']
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict(), 201

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/following')
@login_required
def get_feed():
    """
    Queries for all the posts of users that the current
    user is following, as well as posts written by the user,
    and returns them as a list of dictionaries
    """
    # Return a list of only the posts that the user is following
    # Query for all posts and all associated data
    following_list = current_user.following.all()
    # print(following_list)
    posts = Post.query.order_by(Post.created_at.desc()).options(joinedload(Post.author), joinedload(
        Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
    followed_posts = [post for post in posts if (post.author in following_list) or (
        post.author.id == int(current_user.get_id()))]

    # For each post,
    # We need to know if the current user is following them
    # We need to know if the author of the post is in the current user's following list

    response = {
        "Posts": []
    }
    for post in followed_posts:
        post_dict = post.to_dict()
        post_dict['Media'] = [media.to_dict() for media in post.media]
        post_dict['notes'] = len(post.comments) + len(post.user_likes)
        post_author_dict = post.author.to_dict()
        post_dict['User'] = {
            "id": post_author_dict['id'],
            "username": post_author_dict['username'],
            "profileImageUrl": post_author_dict['profileImageUrl'],
            "following": post.author in following_list
        }

        response["Posts"].append(post_dict)

    return response

# Database.query.get_or_404(id)
# Try/Except Lazy Copy
    # try:
    # except:
    #   return {'message': "Post couldn't be found"}, 404
    # else:

# Route updates with a request body of just "media_url"
# Applies post_id and post_type
# Errors out with post ID that doesn't exist.
# Errors out when user not logged in.


@post_routes.route('/<int:id>/media', methods=['POST'])
@login_required
def add_media(id):
    """
    Adds a media link to a given post
    Returns an error if the post can't be found,
    or if the current user does not own the post,
    return a forbidden message
    """
    form = MediaForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # Try/Except will respond with an error if
    # in creating the media entry
    # there is no post matching the post_id
    try:
        current_post = Post.query.get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404
    else:
        if current_post.user_id != int(current_user.get_id()):
            return {'message': "Forbidden"}, 403
        if form.validate_on_submit():
            add_media = Media(
                post_id=current_post.id,
                media_type=current_post.post_type,
                media_url=form.data['media_url'],
            )
            db.session.add(add_media)
            db.session.commit()
            return add_media.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# NTS - This route may need to be moved above or below other routes.
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    """
    Edits an existing post. If the current post can't be found,
    or if current user does not own the post, returns an error message
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
        current_post = Post.query.get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404
    else:
        if current_post.user_id != int(current_user.get_id()):
            return {'message': "Forbidden"}, 403
        if form.validate_on_submit():
            current_post.text = form.data['text']
            current_post.title = form.data['title']
            current_post.post_type = form.data['post_type']
            db.session.commit()
            return current_post.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# NTS - Like above, this route may need to be moved above or below other routes.
@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    """
    Deletes an existing post. If post does not exist, or if
    post is not owned by current user, returns an error message
    """
    try:
        post_to_delete = Post.query.get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404
    else:
        if post_to_delete.user_id != int(current_user.get_id()):
            return {'message': "Forbidden"}, 403
        db.session.delete(post_to_delete)
        db.session.commit()
        return {'message': "Successfully deleted"}, 200


# ------------------------------------------------------------
# Comment Routes - (that have a prefix of /posts/:postId)
# ------------------------------------------------------------


# Route - Get all comments of a post:
@post_routes.route('/<int:id>/comments', methods=['GET'])
def get_all_comments(id):
    """
    Queries for all comments of an existing post and returns
    it as a list of dictionaries in reverse chronological order
    along with user information
    """
    # Check if the post exists. If not, return error message:
    try:
        Post.query.get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404

    # Query for all comments of a single post with the given post id:
    comments = Comment.query.filter(Comment.post_id == id).order_by(
        Comment.created_at.desc()).options(joinedload(Comment.user)).all()

    # Initialize response format,
    # convert query comment data to dictionaries,
    # and add converted data to response:
    response = {
        "Comments": []
    }
    for comment in comments:
        userId = comment.user.id
        username = comment.user.username
        profileImageUrl = comment.user.profile_image_url
        comment = comment.to_dict()
        comment['User'] = {
            "id": userId,
            "username": username,
            "profileImageUrl": profileImageUrl
        }
        response["Comments"].append(comment)

    response['totalComments'] = len(response['Comments'])

    return response


# Route - Add a comment to a post:
@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment(id):
    """
    Adds a comment to an existing post, and returns it as a dictionary
    """
    # Check if the post exists. If not, return error message:
    try:
        Post.query.get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404

    # Validate incoming comment:
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # If validation successful,
        # create and commit new comment instance:
        new_comment = Comment(
            user_id=current_user.get_id(),
            post_id=id,
            comment=form.data["comment"]
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()

    # If form validation is unsuccessful, default to error message return:
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# LIKES - Route begins with /posts for LIKES


@post_routes.route('/<int:id>/likes', methods=['GET'])
def get_all_likes(id):
    # get all users who have liked a given post
    # query for a post and then query for all its likes
    # return them in a list
    # add totallikes as a key, and add user-information for each like
    """
    Returns a list of all the users who have liked a post,
    and includes whether the current user is following them
    """

    # Checks whether the current post exists and loads all its associated data
    try:
        # print('first query---------------------------------------------')
        current_post = Post.query.options(
            joinedload(Post.user_likes)).get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404

    # Checks if current user exists, and creates a list of all the users they are following
    following_list = []
    if current_user.get_id():
        # print('second query--------------------------------------------')
        following_list = current_user.following.all()

    # Structures the response and adds a total likes key
    response = {
        "Likes": [],
        "totalLikes": len(current_post.user_likes)
    }

    # Adds appropriate data to the response list
    for user in current_post.user_likes:
        # print('third query---------------------------------------------')
        response['Likes'].append({
            "id": user.id,
            "username": user.username,
            "profileImageUrl": user.profile_image_url,
            "following": user in following_list
        })

    return response


@post_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def like_post(id):
    """
    Adds a user to a given post's list of user_likes
    """
    print(current_user)
    # Find the current_user
    # Find the current post
    try:
        current_post = Post.query.options(
            joinedload(Post.user_likes)).get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404
    # Add it to the current_post's list
    if current_user in current_post.user_likes:
        return {'message': f"User {current_user.id} has already liked this post"}, 403
    else:
        current_post.user_likes.append(current_user)
    # Commit
    db.session.commit()
    # Return the new like?
    print(current_post.user_likes)

    return {"message": f"Post {id} successfully liked by User {current_user.id}"}, 201


@post_routes.route('/<int:id>/likes', methods=['DELETE'])
@login_required
def remove_like(id):
    """
    Removes a like from a post, and returns an error if
    like or post does not exist
    """
    try:
        current_post = Post.query.options(
            joinedload(Post.user_likes)).get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404

    # remove current user from current user's like list
    if current_user in current_post.user_likes:
        current_post.user_likes.remove(current_user)
        db.session.commit()
        return {
            "message": f"Like successfully removed from post {id}"
        }
    else:
        return {"message": "Current user does not have a like for this post"}, 404
