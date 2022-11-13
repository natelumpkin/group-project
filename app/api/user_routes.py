from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post
from sqlalchemy.orm import joinedload
from ..models import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'Users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/posts')
def get_current_user_posts(id):
    """
    Query for all the posts of a given user and returns
    a list of dictionaries
    """
    try:
        User.query.get_or_404(id)
    except:
        return { "message": "User couldn't be found"}, 404

    # print(following_list)
    posts = Post.query.filter(Post.user_id == id).order_by(Post.created_at.desc()).options(joinedload(
        Post.author), joinedload(Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
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
            "profileImageUrl": post_author_dict['profileImageUrl'],
            "following": post.author in following_list
        }

        response["Posts"].append(post_dict)

    return response

# ------------------------------------------------------------
# Follow Routes - (that have a prefix of /users/:userId)
# ------------------------------------------------------------

# Get all followers of a user:


@user_routes.route('/<int:id>/followers', methods=['GET'])
@login_required
def get_all_followers(id):
    """
    Get all followers of the current user
    """
    try:
        target_user = User.query.get_or_404(id)
    except:
        return {"message": "User couldn't be found"}, 404

    target_user_followers_query = target_user.followers.all()

    following_list = []
    if current_user.get_id():
        following_list = current_user.following.all()

    target_user_followers = {
        "Followers": [],
        "totalFollowers": len(target_user_followers_query)
    }

    for follower in target_user_followers_query:
        user_follower = follower.to_dict_less()
        user_follower['following'] = follower in following_list
        target_user_followers["Followers"].append(user_follower)

    return target_user_followers


@user_routes.route('/<int:id>/following', methods=['GET'])
@login_required
def get_all_following(id):
    """
    Get all users that the target user is following.
    Show whether current user is following each user.
    """
    # Get target user
    try:
        target_user = User.query.get_or_404(id)
    except:
        return {"message": "User couldn't be found"}, 404

    # Get all users followed by the target user for result
    target_user_following_query = target_user.following.all()

    # Generate a list of all users current user is following
    current_user_following_list = []
    if current_user.get_id():
        current_user_following_list = current_user.following.all()

    # Create response structure
    target_user_following = {
        "Following": [],
        "totalFollowing": len(target_user_following_query)
    }

    # Itterate through result list
    for user in target_user_following_query:
        # Convert each user to JSON equivalent

        user_following = user.to_dict_less()

        # Add following key to converted user
        # Indicates if current user is following that user
        user_following['following'] = user in current_user_following_list

        # Append user to response structure
        target_user_following['Following'].append(user_following)

    # Return list of all users that target user is following
    return target_user_following


@user_routes.route('/<int:id>/followers', methods=['POST'])
@login_required
def create_a_follow(id):
    """
    Add a user to the session users following list
    """

    try:
        target_user = User.query.get_or_404(id)
    except:
        return {'error': "User couldn't be found"}, 404

    if current_user.id == int(id):
        return {'message': f"Users can't follow themsevles"}, 403

    if target_user in current_user.following:
        return {'message': f"User {current_user.id} is already following User {id}"}, 403

    else:
        current_user.following.append(target_user)
        db.session.commit()
        return {'message': f"User {current_user.id} has successfully followed user {id}"}


@ user_routes.route('/<int:id>/followers', methods=['DELETE'])
@ login_required
def delete_a_follow(id):
    """
    Delete a user from the session users following list

    """
    try:
        target_user = User.query.get_or_404(id)
    except:
        return {"error": "User couldn't be found"}, 404

    if target_user not in current_user.following:
        return {'message': f"User {current_user.id} isn't following user {id}"}, 403

    else:
        current_user.following.remove(target_user)
        db.session.commit()
        return {'message': f"User {current_user.id} has successfully unfollowed user {id}"}
