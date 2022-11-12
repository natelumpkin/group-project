from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Length


# Selection options for post type:
post_type_list = ["text", "quote", "image", "video", "link"]


class PostForm(FlaskForm):
    post_type = SelectField("Post Type", validators=[
                            DataRequired()], choices=post_type_list)
    title = StringField("Title", validators=[Length(min=2, max=100), DataRequired()])
    text = TextAreaField("Text", validators=[Length(min=2, max=1000), DataRequired()])
