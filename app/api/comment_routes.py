from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Comment, Post, User
from app.forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)


# Route - Edit a comment
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    # Validate incoming comment data:
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # Verify that the comment exists:
    try:
        current_comment = Comment.query.get_or_404(id)
    except:
        return {'message': "Comment couldn't be found"}, 404
    else:
        # Verify user ownership of the comment:
        if int(current_user.get_id()) != int(current_comment.user_id):
            return {'message': "Current user does not have edit rights to this content"}, 403
        if form.validate_on_submit():
            # If validation is successful,
            # perform and commit comment change:
            current_comment.comment = form.data["comment"]
            db.session.commit()
            return current_comment.to_dict()

        # If form validation is unsuccessful, default to error message return:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    pass
