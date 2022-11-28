from app.models import db, User, Blog, Comment, environment, SCHEMA


def seed_blogs():
    blog1 = Blog(
        user_id=1,
        blog_title="My First Blog Post",
        blog_body="Dear diary, today I learned how to make a blog post!",
    )
    blog2 = Blog(
        user_id=2,
        blog_title="My First Blog Post",
        blog_body="Dear diary, today I learned how to make a blog post!",
    )
    blog3 = Blog(
        user_id=3,
        blog_title="My First Blog Post",
        blog_body="Dear diary, today I learned how to make a blog post!"
    )
    blog4 = Blog(
        user_id=1,
        blog_title="My Second Blog Post",
        blog_body="Dear diary, today I learned how to make a second blog post!",
    )
    blog5 = Blog(
        user_id=2,
        blog_title="My Second Blog Post",
        blog_body="Dear diary, today I learned how to make a second blog post!",
    )
    blog6 = Blog(
        user_id=3,
        blog_title="My Second Blog Post",
        blog_body="Dear diary, today I learned how to make a second blog post!"
    )

    db.session.add(blog1)
    db.session.add(blog2)
    db.session.add(blog3)
    db.session.add(blog4)
    db.session.add(blog5)
    db.session.add(blog6)
    db.session.commit()

# def undo_blogs():
#     db.session.execute('TRUNCATE blogs RESTART IDENTITY CASCADE;')
#     db.session.commit()

def undo_blogs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM blogs")

    db.session.commit()
