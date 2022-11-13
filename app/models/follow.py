from .db import db, SCHEMA, add_prefix_for_prod, environment
from datetime import datetime

follows = db.Table(
  'follows',
  db.Model.metadata,
  db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
  db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
  db.Column('created_at', db.DateTime, default=datetime.utcnow()),
  schema=SCHEMA if environment == "production" else None
)

if environment == "production":
  follows.schema = SCHEMA
