from flask import Blueprint
from flask_login import current_user
from app.models import Post, Comment, User, Media

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def get_all_posts():
  posts = Post.query.order_by(Post.created_at).all()
  response = {
    "Posts": []
  }
  for post in posts:
    post_dict = post.to_dict()
    post_dict['Media'] = []
    post_dict['User'] = {}
    post_author = post.author
    print(post_author)
  return 'Hello from get all posts'
