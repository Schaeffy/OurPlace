from flask import Blueprint, render_template, redirect, request, jsonify
from ..models import db, User, BlogPost, Comment, Friendship, FriendRequest
from ..models.db import db
from flask_login import login_required, current_user
from ..forms import CommentForm
