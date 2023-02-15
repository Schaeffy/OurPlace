from app.models import db, ProfilePic, environment, SCHEMA


def undo_profile_pic():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.profile_pics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM profile_pics")

    db.session.commit()
