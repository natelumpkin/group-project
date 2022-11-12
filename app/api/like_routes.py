from flask import Blueprint
from app.models import User, Post
from flask_login import current_user

like_routes = Blueprint('likes', __name__)
