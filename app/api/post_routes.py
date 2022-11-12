from flask import Blueprint
from flask_login import current_user
from app.models import Post, Comment, User, Media

post_routes = Blueprint('posts', __name__)
