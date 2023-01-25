from app.models import db, Friendship, environment, SCHEMA

def seed_friendships():

    friendship1 = Friendship(
        user1_id=12,
        user2_id=13
    )
    friendship2 = Friendship(
        user1_id=12,
        user2_id=11
    )
    friendship3 = Friendship(
        user1_id=10,
        user2_id=12
    )
    friendship4 = Friendship(
        user1_id=3,
        user2_id=12
    )

    db.session.add(friendship1)
    db.session.add(friendship2)
    db.session.add(friendship3)
    db.session.add(friendship4)

    db.session.commit()


def undo_friendships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendship RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE friendship RESTART IDENTITY CASCADE;')
    db.session.commit()
