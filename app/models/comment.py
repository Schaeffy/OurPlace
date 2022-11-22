from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id1 = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id1')))
    user_id2 = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id2')))
    comment_body = db.Column(db.String(600), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.current_timestamp())
    updated_at = db.Column(db.DateTime(timezone=True),
                           onupdate=func.current_timestamp())


    comment_user = db.relationship('User', back_populates='user_comment')
    blog_post_user = db.relationship('User', back_populates='user_blog_post')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id1,
            "user_id2": self.user_id2,
            "comment_body": self.comment_body,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "commentter": self.comment_user.to_dict()
        }
