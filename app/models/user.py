from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_img = db.Column(db.String(255), nullable=True)
    profile_name = db.Column(db.String(100))
    status = db.Column(db.String(100))
    mood = db.Column(db.String(100))
    brief_you = db.Column(db.String(100))
    here_for = db.Column(db.String(100))
    hometown = db.Column(db.String(100))
    ethnicity = db.Column(db.String(100))
    occupation = db.Column(db.String(100))
    about_me = db.Column(db.Text)
    general = db.Column(db.Text)
    music = db.Column(db.Text)
    movies = db.Column(db.Text)
    television = db.Column(db.Text)
    books = db.Column(db.Text)
    heroes = db.Column(db.Text)
    instagram = db.Column(db.String(100))
    snapchat = db.Column(db.String(100))
    github = db.Column(db.String(100))
    twitter = db.Column(db.String(100))
    youtube = db.Column(db.String(100))
    twitch = db.Column(db.String(100))
    tiktok = db.Column(db.String(100))
    soundcloud = db.Column(db.String(100))
    spotify = db.Column(db.String(100))
    pintrest = db.Column(db.String(100))

    # user_detail = db.relationship(
    #     'UserDetail', back_populates='detail_user', cascade='all, delete-orphan')
    # user_link = db.relationship(
    #     'UserLink', back_populates='link_user', cascade='all, delete-orphan')

    user_blog = db.relationship(
        'Blog', back_populates='blog_user', cascade="all, delete")
    # user_commenter = db.relationship(
    #     'Comment', back_populates='commenter', cascade="all, delete", foreign_keys='Comment.commenter')
    # user_commented = db.relationship(
    #     'Comment', back_populates='commenter', cascade="all, delete", foreign_keys='Comment.commented')

    # requested_rels = db.relationship(
    #     "Friend_Request",
    #     foreign_keys="Friend_Request.requesting_user_id",
    #     back_populates='requesting_user'
    # )
    # received_rels = db.relationship(
    #     'Friend_Request',
    #     foreign_keys='Friend_Request.receiving_user_id',
    #     back_populates='receiving_user'
    # )

    # aspiring_friends = association_proxy('received_rels', 'requesting_user')
    # desired_friends = association_proxy('requested_rels', 'receiving_user')

    # friend_1 = db.relationship(
    #     'Friend', foreign_keys='Friend.user_1_id', back_populates='user_1')
    # friend_2 = db.relationship(
    #     'Friend', foreign_keys='Friend.user_2_id', back_populates='user_2')

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
            'email': self.email,
            'profile_img': self.profile_img,
            "profile_name": self.profile_name,
            "status": self.status,
            "mood": self.mood,
            "brief_you": self.brief_you,
            "here_for": self.here_for,
            "hometown": self.hometown,
            "ethnicity": self.ethnicity,
            "occupation": self.occupation,
            "about_me": self.about_me,
            "general": self.general,
            "music": self.music,
            "movies": self.movies,
            "television": self.television,
            "books": self.books,
            "heroes": self.heroes,
            "instagram": self.instagram,
            "snapchat": self.snapchat,
            "github": self.github,
            "twitter": self.twitter,
            "youtube": self.youtube,
            "twitch": self.twitch,
            "tiktok": self.tiktok,
            "soundcloud": self.soundcloud,
            "spotify": self.spotify,
            "pintrest": self.pintrest,
        }
