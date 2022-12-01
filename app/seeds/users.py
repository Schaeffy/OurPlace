from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    tom = User(
        username='Tom',
        email='tom@aa.io',
        password='password',
        profile_img='https://i.imgur.com/4R76U4M.jpg',
        status=':-)',
        mood='chillin',
        brief_you=
        '''Male
        30 years old
        Santa Monica, CA''',
        about_me='Hey my name is Tom and I am your friend!',
        here_for="I'd like to meet people who educate, inspire or entertain me... I have a few close friends I've known all my life. I'd like to make more.",
        general= "Internet, Movies, Reading, Dancing, Karaoke, Baseball, Language, Culture, History of Communism, Philosophy, Singing/Writing Music, Running, Finding New Food, Weight Lifting, Hiking, WWI Aviation, Travel, Building alternate communities"
        )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password'
        )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password'
        )
    kelly = User(
        username='kelly',
        email='kelly@aa.io',
        password='password'
        )
    andrew = User(
        username='andrew',
        email='andrew@aa.io',
        password='password'
        )
    simon = User(
        username='simon',
        email='simon@aa.io',
        password='password'
        )

    db.session.add(tom)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kelly)
    db.session.add(andrew)
    db.session.add(simon)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
