from .db import db, environment, SCHEMA, add_prefix_for_prod
import enum


class RequestState(enum.enum):
    accepted = 'Accepted'
    pending = 'Pending'
    rejected = 'Rejected'

    def __init__(self):
        return self.value

class FriendshipRequest(db.Model):
    __tablename__ = 'friendship_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    requesting_user_id = db.Column(
        db.Integer, db.ForeignKey('User.id'), primary_key=True)
    receiving_user_id = db.Column(
        db.Integer, db.ForeignKey('User.id'), primary_key=True)
    status = db.Column(db.Enum(RequestState), nullable=False)
