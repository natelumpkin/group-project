from flask import Blueprint
from flask_login import current_user
from app.models import Comment, Post, User

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    pass


@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    pass
