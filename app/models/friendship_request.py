from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# import enum


# class RequestState(enum.Enum):
#     accepted = 'Accepted'
#     pending = 'Pending'
#     rejected = 'Rejected'

    # def __init__(self):
    #     return self.value

# requests = db.Table('requests',
#     db.Column('requesting_user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('receiving_user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
# )

class FriendshipRequest(db.Model):
    __tablename__ = 'friendship_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    requesting_user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    receiving_user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    # status = db.Column(db.Enum(RequestState), nullable=False)
    # id = db.Column(db.Integer, primary_key=True)
    # requesting_user_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('users.id')))
    # receiving_user_id = db.Column(db.Integer, db.ForeignKey(
    #     add_prefix_for_prod('users.id')))
    # status = db.Column(db.Enum(RequestState), nullable=False)

    # requester = db.relationship('User', back_populates='requested_friends', foreign_keys='requesting_user_id')
    # requested = db.relationship('User', back_populates='received_friends', foreign_keys='receiving_user_id')

    def to_dict(self):
        return {
            "requesting_user_id": self.requesting_user_id,
            "receiving_user_id": self.receiving_user_id
            # "status": self.status
        }
