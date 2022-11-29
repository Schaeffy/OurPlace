from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from app.models import User
from ..models import db, User, Blog, Comment
from ..forms import BlogForm

blog_routes = Blueprint('blogs', __name__)


def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@blog_routes.route('/')
def get_all_blogs():
    blogs = Blog.query.all()
    return {'blogs': [blog.to_dict() for blog in blogs]}


@blog_routes.route('/<int:id>')
def get_one_blog(id):
    blog = Blog.query.get(id)
    return blog.to_dict()

@blog_routes.route('/new', methods=['POST'])
@login_required
def create_blogpost():
    form = BlogForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        blog = Blog(
            user_id=current_user.id,
            blog_title=form.data['blog_title'],
            blog_body=form.data['blog_body']
        )
        db.session.add(blog)
        db.session.commit()
        return blog.to_dict()
    return {'errors': validation_errors(form.errors)}, 401


@blog_routes.route('/<int:blogId>', methods=['DELETE'])
@login_required
def delete_blogpost(id):
    blog = Blog.query.get(id)
    db.session.delete(blog)
    db.session.commit()
    return {"message": "Blog post deleted"}


@blog_routes.route('blogs/<int:blogId>/edit', methods=['PUT'])
@login_required
def edit_blogpost(id):
    blog = Blog.query.get(id)
    form = BlogForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user.id != blog.user_id:
        return {"errors": "You can't edit this blog post"}
    if not blog:
        return {"errors": "Blog post not found"}

    if form.validate_on_submit():
        blog.title = form.data['blog_title']
        blog.body = form.data['blog_body']
        db.session.commit()
        return blog.to_dict()
    return {'errors': validation_errors(form.errors)}, 401
