from .db import db
from datetime import datetime

follows = db.Table(
  'follows',
  db.Model.metadata,
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
  db.Column('created_at', db.DateTime, default=datetime.utcnow())
)
