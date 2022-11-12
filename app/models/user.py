from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import follows
from datetime import datetime
from .like import likes


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(), default=datetime.utcnow())
    updated_at = db.Column(db.DateTime(), default=datetime.utcnow())

    # This relationship allows you to access both the collection of users
    # that follow a given user (with user.followers), and the collection
    # of users that a user follows (with user.following)
    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.user_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
    )

    # An author/user can have posts, a post has only one author/user -
    # A user's posts are deleted when the user is deleted.
    posts = db.relationship(
        "Post", back_populates="author", cascade="all, delete-orphan")

    # A user can have many comments, a comment has one user.
    comments = db.relationship("Comment", back_populates="user")

    # A user can like many posts, a post can only be liked by one user
    liked_posts = db.relationship(
        "Post", secondary=likes, back_populates="user_likes")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        """
        Converts all class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_image_url': self.profile_image_url
        }

    def to_dict_less(self):
        """
        Converts only necessary class data into a dictionary for use in api routes
        """
        return {
            'id': self.id,
            'username': self.username,
            'profile_image_url': self.profile_image_url
        }
