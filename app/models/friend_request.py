from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friendship(db.Model):
    __tablename__ = 'friend_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    requesting_user_id = db.Column(
        db.Integer, db.ForeignKey('User.id'), primary_key=True)
    receiving_user_id = db.Column(
        db.Integer, db.ForeignKey('User.id'), primary_key=True)

    status = db.Column(db.Integer)
