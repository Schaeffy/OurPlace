from .db import db, environment, SCHEMA, add_prefix_for_prod


class Friendship(db.Model):
    __tablename__ = 'friendships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    user2_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    def to_dict(self):
        return {
            "id": self.id,
            "user1": self.user1_id,
            "user2": self.user2_id
        }
