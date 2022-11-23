from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from app.models import User
from ..models import db, User, BlogPost, Comment, Friendship, FriendRequest
from ..forms import BlogPostForm

blog_routes = Blueprint('blogs', __name__)


def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@blog_routes.route('/')
def get_all_blogs():
    blogs = BlogPost.query.all()
    return {'blogs': [blog.to_dict() for blog in blogs]}


@blog_routes.route('/<int:id>')
def get_one_blog(id):
    blog = BlogPost.query.get(id)
    return blog.to_dict()
