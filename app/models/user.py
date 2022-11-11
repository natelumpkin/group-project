from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.followerId == id),
        secondaryjoin=(follows.c.userId == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )
    # this relationship allows you to access both the collection of users
    # that follow a given user (with user.followers), and the collection
    # of users that a user follows (with user.following)
    # following = db.relationship(
    #     "User",
    #     secondary=follows,
    #     primaryjoin=(follows.c.userId == id),
    #     secondaryjoin=(follows.c.followerId == id),
    #     backref=db.backref("followers", lazy="dynamic"),
    #     lazy="dynamic"
    # )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
