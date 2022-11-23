from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    commenter = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    commented = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    comment_body = db.Column(db.String(600), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True),
                           onupdate=func.current_timestamp())

    # commenter = db.relationship('User', back_populates='user_commenter')
    # commented = db.relationship('User', back_populates='user_commented')
    # blog_post_user = db.relationship('User', back_populates='user_blog_post')

    def to_dict(self):
        return {
            "id": self.id,
            "commenter": self.commenter,
            "commented": self.commented,
            "comment_body": self.comment_body,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "commentter": self.comment_user.to_dict()
        }
