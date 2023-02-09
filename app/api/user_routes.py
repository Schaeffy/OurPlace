from flask import Blueprint, render_template, redirect, request, jsonify
from flask_login import login_required, current_user
from app.models import User
from ..models import db, User, Blog, Comment, Friendship, FriendshipRequest
from ..forms import CommentForm, BlogForm, ProfileForm, FriendForm, RequestForm


user_routes = Blueprint('users', __name__)


def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_profile(id):
    user = User.query.get(id)

    if not user:
        return {'errors': ['User not found']}, 404
    if user.id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    form = ProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user.profile_img = form.data['profile_img']
        user.profile_name = form.data['profile_name']
        user.status = form.data['status']
        user.mood = form.data['mood']
        user.brief_you = form.data['brief_you']
        user.here_for = form.data['here_for']
        user.about_me = form.data['about_me']
        user.general = form.data['general']
        user.music = form.data['music']
        user.movies = form.data['movies']
        user.television = form.data['television']
        user.books = form.data['books']
        user.heroes = form.data['heroes']
        user.instagram = form.data['instagram']
        user.twitter = form.data['twitter']
        user.snapchat = form.data['snapchat']
        user.tiktok = form.data['tiktok']
        user.twitch = form.data['twitch']
        user.youtube = form.data['youtube']
        user.soundcloud = form.data['soundcloud']
        user.spotify = form.data['spotify']
        user.pintrest = form.data['pintrest']
        user.github = form.data['github']

        # user.profile_img = form.data['profile_img']
        # user.profile_name = form.data['profile_name']
        # user.status = form.data['status']
        # user.mood = form.data['mood']
        # user.brief_you = form.data['brief_you']
        # user.here_for = form.data['here_for']
        # user.hometown = form.data['hometown']
        # user.ethnicity = form.data['ethnicity']
        # user.occupation = form.data['occupation']
        # user.about_me = form.data['about_me']
        # user.general = form.data['general']
        # user.music = form.data['music']
        # user.movies = form.data['movies']
        # user.television = form.data['television']
        # user.books = form.data['books']
        # user.heroes = form.data['heroes']
        # user.instagram = form.data['instagram']
        # user.snapchat = form.data['snapchat']
        # user.github = form.data['github']
        # user.twitter = form.data['twitter']
        # user.youtube = form.data['youtube']
        # user.twitch = form.data['twitch']
        # user.tiktok = form.data['tiktok']
        # user.soundcloud = form.data['soundcloud']
        # user.spotify = form.data['spotify']
        # user.pintrest = form.data['pintrest']

        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors(form.errors)}, 401


@user_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_user(id):
    user = User.query.get(id)

    if not user:
        return {'errors': ['User not found']}, 404
    if user.id != current_user.id:
        return {'errors': ['Unauthorized']}, 401

    db.session.delete(user)
    db.session.commit()

    return user.to_dict()





# COMMENT ROUTES ----------------------------------------------------------------
@user_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def create_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            commenter=current_user.id,
            commented=id,
            comment_body=form.data['comment_body']
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors(form.errors)}, 401


# BLOG ROUTES ----------------------------------------------------------------

@user_routes.route('/<int:id>/blog')
def get_user_blogs(id):
    blogs = Blog.query.filter(id == Blog.user_id).desc().all()

    return {"user": [blog.to_dict() for blog in blogs]}

# @user_routes.route('/<int:id>/blog', methods=['POST'])
# @login_required
# def create_blogpost(id):
#     form = BlogForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         blog = Blog(
#             user_id=current_user.id,
#             title=form.data['title'],
#             body=form.data['body']
#         )
#         db.session.add(blog)
#         db.session.commit()
#         return blog.to_dict()
#     return {'errors': validation_errors(form.errors)}, 401


# @user_routes.route('/<int:id>/blog/<int:blogId>', methods=['DELETE'])
# @login_required
# def delete_blogpost(id):
#     blog = Blog.query.get(id)
#     db.session.delete(blog)
#     db.session.commit()
#     return {"message": "Blog post deleted"}


# @user_routes.route('/<int:id>/blog/<int:blogId>', methods=['PUT'])
# @login_required
# def edit_blogpost(id):
#     blog = Blog.query.get(id)
#     form = BlogForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if current_user.id != blog.user_id:
#         return {"errors": "You can't edit this blog post"}
#     if not blog:
#         return {"errors": "Blog post not found"}

#     if form.validate_on_submit():
#         blog.title = form.data['title']
#         blog.body = form.data['body']
#         db.session.commit()
#         return blog.to_dict()
#     return {'errors': validation_errors(form.errors)}, 401


@user_routes.route('/<int:id>/befriend', methods=['POST'])
@login_required
def create_request():
    form = RequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        request = FriendshipRequest(
            requesting_user_id=current_user.id,
            receiving_user_id=form.data['receiving_user_id']
        )
        db.session.add(request)
        db.session.commit()
        return request.to_dict()
    return {'errors': validation_errors(form.errors)}, 401



@user_routes.route('/<int:id>/unfriend', methods=['DELETE'])
@login_required
def delete_friend(id):
    friendship = Friendship.query.filter((Friendship.user1_id == id and Friendship.user2_id == current_user.id) | (Friendship.user1_id == current_user.id and Friendship.user2_id == id)).first()
    print('---------------------',friendship)
    db.session.delete(friendship)
    db.session.commit()
    return {"message": "Friendship deleted"}

@user_routes.route('/<int:id>/friends')
# @login_required
def get_all_friends(id):
    friends = Friendship.query.filter((Friendship.user1_id == id) | (Friendship.user2_id == id)).all()

    # friend_list = []

    # for friend in friends:
    #     user1_id = (User.query.filter(User.id == friend.user1_id).first()).to_dict()
    #     user2_id = (User.query.filter(User.id == friend.user2_id).first()).to_dict()
    #     friends_dict = friend.to_dict()
    #     friends_dict['user1'] = user1_id
    #     friends_dict['user2'] = user2_id
    #     friend_list.append(friends_dict)

    # return {"friends": [friend for friend in friend_list]}

    return {"friends": [friend.to_dict() for friend in friends]}
