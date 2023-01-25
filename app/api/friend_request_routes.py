from flask import Blueprint, render_template, redirect, request, jsonify
from ..models import db, User, Blog, Comment, Friendship, FriendshipRequest
from ..models.db import db
from flask_login import login_required, current_user
from ..forms import RequestForm, FriendForm

request_routes = Blueprint('requests', __name__)

def validation_errors(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@request_routes.route('/')
def get_all_requests():
    requests = FriendshipRequest.query.all()

    # request_list = []

    # for request in requests:
    #     requester = (User.query.filter(User.id == request.requesting_user_id).first()).to_dict()
    #     requested = (User.query.filter(User.id == request.receiving_user_id).first()).to_dict()
    #     requests_dict = request.to_dict()
    #     requests_dict['requester'] = requester
    #     requests_dict['requested'] = requested
    #     request_list.append(requests_dict)

    # return {"requests": [request for request in request_list]}

    return {"requests": [request.to_dict() for request in requests]}

# @request_routes.route('/new', methods=['POST'])
# @login_required
# def create_request():
#     form = RequestForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         request = FriendshipRequest(
#             requesting_user_id=current_user.id,
#             receiving_user_id=form.data['receiving_user_id']
#         )
#         db.session.add(request)
#         db.session.commit()
#         return request.to_dict()
#     return {'errors': validation_errors(form.errors)}, 401

@request_routes.route('/', methods=['DELETE'])
@login_required
def delete_request(id):
    request = FriendshipRequest.query.get(id)
    db.session.delete(request)
    db.session.commit()
    return request.to_dict()


# @request_routes.route('/', methods=['POST'])
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
