from app.models import db, User, Blog, Comment, environment, SCHEMA


def seed_comments():
    comment1 = Comment(
        commenter=2,
        commented=3,
        comment_body="Hey, what's up? See you in Mod 1"
    )
    comment2 = Comment(
        commenter=2,
        commented=1,
        comment_body="Hey Tom!"
    )

    comment3 = Comment(
        commenter=3,
        commented=2,
        comment_body="Hey! Bill! How's it going?"
    )

    comment4 = Comment(
        commenter=3,
        commented=4,
        comment_body="Hey, I hope you're doing well. it was great seeing you again!"
    )
    comment5 = Comment(
        commenter=6,
        commented=7,
        comment_body="WHY TELEPORT AND LEAVE ME BEHIND!???"
    )

    comment6 = Comment(
        commenter=7,
        commented=6,
        comment_body="lol my bad"
    )

    comment7 = Comment(
        commenter=8,
        commented=5,
        comment_body="Wow, another bug in the project?"
    )

    comment8 = Comment(
        commenter=8,
        commented=6,
        comment_body="I NEED SOME CSS HELP!"
    )

    comment9 = Comment(
        commenter=5,
        commented=8,
        comment_body="Yo Simon! Can you help me debug my code real quick?"
    )

    comment10 = Comment(
        commenter=2,
        commented=7,
        comment_body="You have been boosted!"
    )

    comment11 = Comment(
        commenter=2,
        commented=6,
        comment_body="Kelly, question for me?"
    )
    comment12 = Comment(
        commenter=5,
        commented=4,
        comment_body="Hey, what kind of keyboard do you use again?"
    )
    comment13 = Comment(
        commenter=4,
        commented=5,
        comment_body="It's called the Moonlander Mark 1. Pretty awesome to use."
    )
    comment14 = Comment(
        commenter=1,
        commented=2,
        comment_body="Nice to meet you!"
    )
    comment15 = Comment(
        commenter=1,
        commented=3,
        comment_body="Thanks for the request!"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.commit()

# def undo_comments():
#     db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
#     db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
