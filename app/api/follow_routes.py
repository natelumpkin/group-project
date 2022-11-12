from flask import Blueprint
from flask_login import current_user
from app.models import User

follow_routes = Blueprint('follows', __name__)
