from .db import db, environment, SCHEMA
from datetime import datetime

class Posts(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    post_type = db.Column(db.String(40), nullable=False)
    title = db.Column(db.String(100))
    text = db.Column(db.Text(1000))
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # A post has one author, an author can have many posts
    author = db.relationship("User", backpopulates="posts")

    # A post can have multiple media:
    media = db.relationship("Media", backpopulates="post", cascade="all, delete-orphan")
