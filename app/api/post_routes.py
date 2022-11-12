from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Post, Comment, User, Media
from sqlalchemy.orm import joinedload

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    # Query for all posts and all associated data
    posts = Post.query.order_by(Post.created_at).options(joinedload(Post.author), joinedload(Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
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

@post_routes.route('/following')
@login_required
def get_feed():
  # Return a list of only the posts that the user is following
  # Query for all posts and all associated data
    following_list = current_user.following.all()
    # print(following_list)
    posts = Post.query.order_by(Post.created_at).options(joinedload(Post.author), joinedload(Post.media), joinedload(Post.user_likes), joinedload(Post.comments)).all()
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
