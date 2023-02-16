from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProfilePic(db.Model):
    __tablename__ = 'profile_pics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="profile_pic", cascade="all")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "url": self.url,
        }
