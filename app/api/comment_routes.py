from flask import Blueprint, render_template, redirect, request, jsonify
from ..models import db, User, BlogPost, Comment
from ..models.db import db
from flask_login import login_required, current_user
from ..forms import CommentForm

comment_routes = Blueprint('comments', __name__)


def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/')
def get_all_comments():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}

@comment_routes.route('/current')
def get_current_user_comments():
    comments = Comment.query.filter(Comment.user_id == current_user.id).all()
    return {"comments": [comment.to_dict() for comment in comments]}


@comment_routes.route('/<int:id>')
def get_comment(id):
    comment = Comment.query.get(id)
    return comment.to_dict()
