from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Media(db.Model):
    __tablename__ = 'media'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    media_type = db.Column(db.String(255))
    media_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # Media belongs to a post:
    post = db.relationship("Post", back_populates="media")

    def to_dict(self):
        """
        Converts class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'postId': self.post_id,
            'mediaType': self.media_type,
            'mediaUrl': self.media_url,
            'createdAt': self.created_at
        }
