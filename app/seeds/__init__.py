from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comments import seed_comments, undo_comments
from .blogs import seed_blogs, undo_blogs
from .friendships import seed_friendships, undo_friendships
from .friendship_requests import seed_friendship_requests, undo_friendship_requests
from .profile_pics import undo_profile_pic

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_blogs()
        undo_comments()
    seed_users()
    seed_comments()
    seed_blogs()
    seed_friendships()
    seed_friendship_requests()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_comments()
    undo_blogs()
    undo_friendships()
    undo_friendship_requests()
    undo_profile_pic()
    # Add other undo functions here
