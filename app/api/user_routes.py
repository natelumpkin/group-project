from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post
from sqlalchemy.orm import joinedload

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/posts')
@login_required
def get_current_user_posts(id):
    """
    Query for all the posts of a given user and returns
    a list of dictionaries
    """

    # print(following_list)
    posts = Post.query.filter(Post.user_id == id).order_by(Post.created_at.desc()).options(joinedload(Post.author), joinedload(Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
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

#------------------------------------------------------------
# Follow Routes - (that have a prefix of /users/:userId)
#------------------------------------------------------------

# Get all followers of a user:
@user_routes.route('/<int:id>/followers', methods=['GET'])
def get_all_followers(id):
  # Check if the user exists. If not, return error message:
  try:
    current_user = User.query.get_or_404(id)
  except:
    return {'message': "User couldn't be found"}, 404

  current_user_followers_query = current_user.followers.all()
  current_user_followers = {
    "Followers": []
  }
  for follower in current_user_followers_query:
    current_user_followers["Followers"].append(follower.to_dict())

  return current_user_followers
