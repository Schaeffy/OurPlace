from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class UserDetail(db.Model):
    __tablename__ = 'user_details'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    profile_img = db.Column(db.String(255), nullable=True)
    profile_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(100))
    mood = db.Column(db.String(100))
    brief_you = db.Column(db.String(100))
    here_for = db.Column(db.String(100))
    hometown = db.Column(db.String(100))
    ethnicity = db.Column(db.String(100))
    occupation = db.Column(db.String(100))
    about_me = db.Column(db.String)
    music = db.Column(db.String)
    movies = db.Column(db.String)
    television = db.Column(db.String)
    books = db.Column(db.String)
    heroes = db.Column(db.String)

    detail_user = db.relationship('User', back_populates='user_detail')

    def to_dict(self):
        return {
            "profile_name": self.profile_name,
            "status": self.status,
            "mood": self.mood,
            "brief_you": self.brief_you,
            "here_for": self.here_for,
            "hometown": self.hometown,
            "ethnicity": self.ethnicity,
            "occupation": self.occupation,
            "about_me": self.about_me,
            "music": self.music,
            "movies": self.movies,
            "television": self.television,
            "books": self.books,
            "heroes": self.heroes,
        }
