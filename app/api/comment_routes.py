from flask import Blueprint
from flask_login import current_user
from app.models import Comment, Post, User

comment_routes = Blueprint('comments', __name__)
