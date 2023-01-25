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
    friendship5 = Friendship(
        user1_id=6,
        user2_id=2
    )
    friendship6 = Friendship(
        user1_id=6,
        user2_id=5
    )
    friendship7 = Friendship(
        user1_id=12,
        user2_id=6
    )
    friendship8 = Friendship(
        user1_id=11,
        user2_id=6
    )


    db.session.add(friendship1)
    db.session.add(friendship2)
    db.session.add(friendship3)
    db.session.add(friendship4)
    db.session.add(friendship5)
    db.session.add(friendship6)
    db.session.add(friendship7)
    db.session.add(friendship8)

    db.session.commit()


def undo_friendships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendship RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE friendship RESTART IDENTITY CASCADE;')
    db.session.commit()
