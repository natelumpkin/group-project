from .db import db, environment, SCHEMA
from datetime import datetime


class Media(db.Model):
    __tablename__ = 'media'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"))
    media_type = db.Column(db.String(255))
    media_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Media belongs to a post:
    post = db.relationship("Post", backpopulates="media")
