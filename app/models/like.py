from .db import db, SCHEMA, add_prefix_for_prod
from datetime import datetime

likes = db.Table(
  add_prefix_for_prod('likes'),
  db.Model.metadata,
  db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
  db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True),
  db.Column('created_at', db.DateTime, default=datetime.utcnow())
)
