# from flask import Blueprint, render_template, redirect, request, jsonify
# from ..models import db, User, Blog, Comment, Friendship, FriendRequest
# from ..models.db import db
# from flask_login import login_required, current_user
# from ..forms import FriendForm


# friend_routes = Blueprint('friends', __name__)

# def validation_errors(validation_errors):
#     errorMessages = []
#     for field in validation_errors:
#         for error in validation_errors[field]:
#             errorMessages.append(f'{field} : {error}')
#     return errorMessages

# @friend_routes.route('/')
# @login_required
# def get_all_friends():
#     friends = Friendship.query.all()

#     friend_list = []

#     for friend in friends:
#         user1 = (User.query.filter(User.id == friend.user1_id).first()).to_dict()
#         user2 = (User.query.filter(User.id == friend.user2_id).first()).to_dict()
#         friends_dict = friend.to_dict()
#         friends_dict['user1'] = user1
#         friends_dict['user2'] = user2
#         friend_list.append(friends_dict)

#     return {"friends": [friend for friend in friend_list]}

# @friend_routes.route('/new', methods=['POST'])
# @login_required
# def create_friendship():
#     form = FriendForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         friend = Friendship(
#             user1_id=form.data['user1_id'],
#             user2_id=form.data['user2_id']
#         )
#         db.session.add(friend)
#         db.session.commit()
#         return friend.to_dict()
#     return {'errors': validation_errors(form.errors)}, 401



# @friend_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_friend(id):
#     friend = Friendship.query.get(id)
#     db.session.delete(friend)
#     db.session.commit()
#     return friend.to_dict()
