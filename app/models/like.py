from .db import db
from datetime import datetime

likes = db.Table(
  'likes',
  db.Model.metadata,
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('post_id', db.Integer, db.ForeignKey('posts.id'), primary_key=True),
  db.Column('created_at', db.DateTime, default=datetime.utcnow())
)
