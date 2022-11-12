from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Media


class MediaForm(FlaskForm):
    media_url = StringField("media url", validators=[DataRequired()])
