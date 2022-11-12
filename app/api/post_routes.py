from flask import Blueprint, jsonify
from flask_login import current_user
from app.models import Post, Comment, User, Media
from sqlalchemy.orm import joinedload

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def get_all_posts():
    # Query for all posts and the associated author's followers
    posts = Post.query.order_by(Post.created_at).all().options(
        joinedload(Post.author.followers))
    response = {
        "Posts": []
    }
    for post in posts:
        post_dict = post.to_dict()
        post_dict['Media'] = []
        post_author_dict = post.author.to_dict()
        post_dict['User'] = {
            "id": post_author_dict['id'],
            "username": post_author_dict['username'],
            "profile_image_url": post_author_dict['profile_image_url'],
            "following": False
        }

        # If there is a current user, check to see if the user follows the post author
        if current_user:
            post_dict["User"]["following"] = current_user in post.author.followers

        response["Posts"].append(post_dict)

    return response
