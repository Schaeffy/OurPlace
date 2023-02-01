from app.models import db, FriendshipRequest, environment, SCHEMA


def seed_friendship_requests():

    friend_request1 = FriendshipRequest(
        requesting_user_id=12,
        receiving_user_id=11,
    )
    friend_request2 = FriendshipRequest(
        requesting_user_id=7,
        receiving_user_id=6,
    )
    friend_request3 = FriendshipRequest(
        requesting_user_id=10,
        receiving_user_id=6,
    )
    friend_request4 = FriendshipRequest(
        requesting_user_id=3,
        receiving_user_id=6,
    )

    db.session.add(friend_request1)
    db.session.add(friend_request2)
    db.session.add(friend_request3)
    db.session.add(friend_request4)
    db.session.commit()

def undo_friendship_requests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendship_request RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('DELETE FROM friendship_requests')
    db.session.commit()
