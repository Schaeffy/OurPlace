from app.models import db, FriendshipRequest, environment, SCHEMA


def seed_friendship_requests():

    friend_request1 = FriendshipRequest(
        requesting_user_id=12,
        receiving_user_id=11,
    )

    db.session.add(friend_request1)
    db.session.commit()

def undo_friendship_requests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendship_request RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE friendship_request RESTART IDENTITY CASCADE;')
    db.session.commit()
