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
    profile_img = db.Column(db.String(255), nullable=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    requested_rels = db.relationship(
        "Friend_Request",
        foreign_key="Friend_Request.requesting_user_id",
        back_populates='requesting_user'
    )
    received_rels = db.relationship(
        'Friend_Request',
        foreign_keys='Friend_Request.receiving_user_id',
        back_populates='receiving_user'
    )

    aspiring_friends = association_proxy('received_rels', 'requesting_user')
    desired_friends = association_proxy('requested_rels', 'receiving_user')

    friend_1 = db.relationship('Friend', foreign_keys='Friend.user_1_id', back_populates='user_1')
    friend_2 = db.relationship('Friend', foreign_keys='Friend.user_2_id', back_populates='user_2')

    user_blog_post = db.relationship(
        'Annotation', back_populates='blog_post_user')
    user_comment = db.relationship('Comment', back_populates='comment_user')

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
            "profile_img": self.profile_img,
        }
