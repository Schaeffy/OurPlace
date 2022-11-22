from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friendship(db.Model):
    __tablename__ = 'friendships'

    user1_id = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key=True)
    user2_id = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key=True)
