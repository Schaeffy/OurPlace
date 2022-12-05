from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Blog(db.Model):
    __tablename__ = 'blogs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    blog_title = db.Column(db.String(100), nullable=False)
    blog_body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True),
                           onupdate=func.current_timestamp())

    blog_user = db.relationship('User', back_populates='user_blog')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "blog_title": self.blog_title,
            "blog_body": self.blog_body,
            "created_at": self.created_at,
            "updated_at": self.updated_at,

        }
