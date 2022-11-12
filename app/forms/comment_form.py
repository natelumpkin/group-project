from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class CommentForm(FlaskForm):
    comment = StringField("Post Type", validators=[
                          DataRequired(), Length(min=1, max=255)])
