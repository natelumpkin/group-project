from .db import db
from datetime import datetime

follows = db.Table(
  'follows',
  db.Model.metadata,
  db.Column('followerId', db.Integer, db.ForeignKey('users.id')),
  db.Column('userId', db.Integer, db.ForeignKey('users.id')),
  db.Column('createdAt', db.DateTime, default=datetime.utcnow())
)
