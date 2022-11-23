from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class UserLink(db.Model):
    __tablename__ = 'user_links'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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

    link_user = db.relationship('User', back_populates='user_link')

    def to_dict(self):
        return {
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
