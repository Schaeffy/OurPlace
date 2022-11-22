from flask import Blueprint,render_template,redirect, jsonify
from ..models import db, User, BlogPost, Comment, Friendship, FriendRequest
from ..models.db import db
from flask_login import login_required, current_user

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def get_all_comments():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}

@comment_routes.route('/<int:id>')
def get_comment(id):
    comment = Comment.query.get(id)
    return comment.to_dict()

@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {"message": "Comment deleted"}

@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    comment = Comment.query.get(id)
    db.session.commit()
    return comment.to_dict()
