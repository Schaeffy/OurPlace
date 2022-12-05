from app.models import db, User, Blog, Comment, environment, SCHEMA


def seed_blogs():
    blog1 = Blog(
        user_id=1,
        blog_title="Hey what a cool site",
        blog_body='''Wow! just discovered this site! Looks really similar to something that I built a while back.
        Brings back a lot of memories! I'm going to have to check out the code for this site and see how it compares to mine.
        ''',
    )
    blog2 = Blog(
        user_id=2,
        blog_title="You Only Line Once",
        blog_body='''If it can be on one line, then it should be on one line! Just kidding.
        I'm not a monster. I do like to keep my code clean and readable, but I also like to keep it short and sweet.
        One liners are great thought exercises, but I they shouldn't be used in production code.
        ''',
    )
    blog3 = Blog(
        user_id=3,
        blog_title="Learning a new language is kind of a haskell",
        blog_body=''' Currently learning Haskell and I'm having a lot of fun with it.
        Did you know that Haskell is a purely functional programming language? It was designed for teaching, research, and industry use.
        It has less than 1% of active users on the Github source code repository.
        '''
    )
    blog4 = Blog(
        user_id=4,
        blog_title="Dad Life",
        blog_body='''Yo! My son just turned 1! I'm so proud of him. He's growing up so fast. I can't believe it's been a year already.
        I'm glad that I finally finished this program and now I have more time to spend with my family.
        Gonna still be coding up a storm though. Looking forward to the next project!
        ''',
    )
    blog5 = Blog(
        user_id=7,
        blog_title="What's done and what's to come",
        blog_body='''What a journey! As I near the end of this program, I'm constantly amazed at how much I've learned.
        This site has been on my mind for quite some time and now that I have the skills to bring it to life, I'm stoked to see it come together.
        The features you see here are just the beginning. There are many more features that I plan on adding such as friend requests, a search bar, blog categories, and more!
        I hope you'll visit again often to see and experience the development of this site.
        ''',
    )
    blog6 = Blog(
        user_id=8,
        blog_title="Boba is love, boba is life",
        blog_body='''Salted cheese Oolong crema is bae! Only comes second to Keshi though <3
        Now that I have what I want, it's time for a nap!
        '''
    )
    blog7 = Blog(
        user_id=5,
        blog_title="Yo, Valo or what?",
        blog_body="Who's down to play Valorant? I'm getting a 5 stack together with some big brain gamers. We beamin!"
    )
    blog8 = Blog(
        user_id=6,
        blog_title="TFT new set coming out soon",
        blog_body='''Lookin' forward to the new set. Kinda getting tired of all these dragonmancer Nunu slammers and la'Goon squad kiddos.
        Goonies always say die!
        Hahah just kidding, but it will be nice to freshen up the meta and see some new comps.
        '''
    )

    db.session.add(blog1)
    db.session.add(blog2)
    db.session.add(blog3)
    db.session.add(blog4)
    db.session.add(blog5)
    db.session.add(blog6)
    db.session.add(blog7)
    db.session.add(blog8)
    db.session.commit()

# def undo_blogs():
#     db.session.execute('TRUNCATE blogs RESTART IDENTITY CASCADE;')
#     db.session.commit()


def undo_blogs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.blogs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM blogs")

    db.session.commit()
