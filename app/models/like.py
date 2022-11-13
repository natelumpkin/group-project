from datetime import datetime

from .db import SCHEMA, add_prefix_for_prod, db, environment

likes = db.Table(
  'likes',
  db.Model.metadata,
  db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
  db.Column('post_id', db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), primary_key=True),
  db.Column('created_at', db.DateTime, default=datetime.utcnow()),
  schema=SCHEMA if environment == "production" else None
)

# if environment == "production":
#   likes.schema = SCHEMA
