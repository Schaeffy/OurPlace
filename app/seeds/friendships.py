from app.models import db, Friendship, environment, SCHEMA

def seed_friendships():

    friendship1 = Friendship(
        user1_id=12,
        user2_id=13
    )

    db.session.add(friendship1)
    db.session.commit()


def undo_friendships():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.friendship RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE friendship RESTART IDENTITY CASCADE;')
    db.session.commit()
