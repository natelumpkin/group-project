from flask import Blueprint, jsonify, request, redirect
from flask_login import current_user, login_required
from app.models import Post, Comment, User, Media, db
from app.forms.post_form import PostForm
from app.forms.media_form import MediaForm
from sqlalchemy.orm import joinedload
from .auth_routes import validation_errors_to_error_messages

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    # Query for all posts and all associated data
    posts = Post.query.order_by(Post.created_at.desc()).options(joinedload(Post.author), joinedload(Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
    following_list = []
    if current_user.get_id():
      following_list = current_user.following.all()

    ## For each post,
    ## We need to know if the current user is following them
      ## We need to know if the author of the post is in the current user's following list

    response = {
        "Posts": []
    }
    for post in posts:
        post_dict = post.to_dict()
        post_dict['Media'] = [ media.to_dict() for media in post.media ]
        post_dict['notes'] = len(post.comments) + len(post.user_likes)
        post_author_dict = post.author.to_dict()
        post_dict['User'] = {
            "id": post_author_dict['id'],
            "username": post_author_dict['username'],
            "profile_image_url": post_author_dict['profile_image_url'],
            "following": post.author in following_list
        }

        response["Posts"].append(post_dict)

    return response

@post_routes.route('/', methods=['POST'])
@login_required
def create_post():
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_post = Post(
      user_id = current_user.get_id(),
      post_type = form.data['post_type'],
      title = form.data['title'],
      text = form.data['text']
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/following')
@login_required
def get_feed():
  # Return a list of only the posts that the user is following
  # Query for all posts and all associated data
    following_list = current_user.following.all()
    # print(following_list)
    posts = Post.query.order_by(Post.created_at.desc()).options(joinedload(Post.author), joinedload(Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
    followed_posts = [ post for post in posts if (post.author in following_list) or (post.author.id == int(current_user.get_id())) ]

    ## For each post,
    ## We need to know if the current user is following them
      ## We need to know if the author of the post is in the current user's following list

    response = {
        "Posts": []
    }
    for post in followed_posts:
        post_dict = post.to_dict()
        post_dict['Media'] = [ media.to_dict() for media in post.media ]
        post_dict['notes'] = len(post.comments) + len(post.user_likes)
        post_author_dict = post.author.to_dict()
        post_dict['User'] = {
            "id": post_author_dict['id'],
            "username": post_author_dict['username'],
            "profile_image_url": post_author_dict['profile_image_url'],
            "following": post.author in following_list
        }

        response["Posts"].append(post_dict)

    return response

##   Database.query.get_or_404(id)
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
    if form.validate_on_submit():
      add_media = Media(
        post_id = current_post.id,
        media_type = current_post.post_type,
        media_url = form.data['media_url'],
      )
      db.session.add(add_media)
      db.session.commit()
      return add_media.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# NTS - This route may need to be moved above or below other routes.
@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    try:
      current_post = Post.query.get_or_404(id)
    except:
        return {'message': "Post couldn't be found"}, 404
    else:
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

    try:
      post_to_delete = Post.query.get_or_404(id)
    except:
      return {'message': "Post couldn't be found"}, 404
    else:
      db.session.delete(post_to_delete)
      db.session.commit()
      return {'message': "Successfully deleted"}, 200


## COMMENTS - Route begins with /posts for COMMENTS


@post_routes.route('/<int:id>/comments', methods=['GET'])
@login_required
def get_all_comments(id):
    pass


@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def add_comment(id):
    pass


## LIKES - Route begins with /posts for LIKES


@post_routes.route('/<int:id>/likes', methods=['GET'])
@login_required
def get_all_likes(id):
    pass


@post_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def like_post(id):
    pass
