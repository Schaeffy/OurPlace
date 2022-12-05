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
        brief_you='''Male
            30 years old
            Santa Monica, CA
            ''',
        about_me='Hey my name is Tom and I am your friend!',
        here_for="I'd like to meet people who educate, inspire or entertain me... I have a few close friends I've known all my life. I'd like to make more.",
        general="Internet, Movies, Reading, Dancing, Karaoke, Baseball, Language, Culture, History of Communism, Philosophy, Singing/Writing Music, Running, Finding New Food, Weight Lifting, Hiking, WWI Aviation, Travel, Building alternate communities",
        music='''Bands: Beatles, Superdrag, Jackson 5, Weezer, Sex Pistols, The Carpenters, Vain, Radiohead, Teenage Fanclub, Rocket from the Crypt, Pitchfork, Oasis, Rialto, Supergrass, Travis, The Doors, Cheap Trick, Simple Plan, Alice Cooper, KISS, A*TEENS, The Beach Boys, The Velvet Underground, Journey

            Solo Artists: Billy Joel, Bruce Springsteen, Elvis, Brendan Benson, David Bowie, Rick Springfield, Barry Manilow, Paul Stanley Solo Album, Bob Dylan, Rod Stewart

            Singers: Michael Jackson (age 14 & under), Karen Carpenter, Whitney Houston (particularly The Bodyguard soundtrack), George Michael, Louie Louie, Coco Lee, Robin Zander, Frank Sinatra, Steve Perry, Gerard Way

            Albums: Appetite for Destruction - Guns & Roses; Life - The Cardigans; A Hard Day's Night - The Beatles; Dookie - Green Day; Blue - Weezer; One Missisipi - Brendan Benson; Two Steps from the Move - Hanoi Rocks; Led Zeppelin I, The Doors, In The Valley of Dying Stars - SuperDrag; Survivor When Seconds Count - Rick Springfield, Working Class Dog

            Instruments: The Er Hu, Piano, certain guitar tones (Rocket from the Crypt, Sex Pistols, Rolling Stones)
            ''',
        movies='''Films: Lawrence of Arabia, Ben Hur, Patton, Spartacus, Gandhi, The 10 Commandments, Apocalypse Now, Beauty & The Beast (the cartoon), Thin Red Line, Titanic, Gladiator, The Patriot, Breakfast at Tiffanys, Un Coeur en Hiver, To Live, Happy Times, The Road Home, Not One Less, Ju Dou, Red Sorghum, The Empire of the Sun, Gone With the Wind, The Godfather, 2001, Clockwork Orange, Blade Runner, Deer Hunter, Mean Streets, Grease, Urban Cowboy, Saturday Night Fever, The Sound of Music, Copland, Xiu Xiu, Dances With Wolves

            Directors: Kubrick, Francis Copolla, Zhang Yimou, Anh Hung Tran, Steven Spielberg
            ''',
        television='''Tuned out. Except for SF Giants. I rented Band of Brothers and liked that.
            ''',
        books='''Nietzsche, George Orwell, Milan Kundera, Laurens van der Post
            '''
    )
    schaeffer = User(
        username='Schaeffer',
        email='marnie@aa.io',
        password='password',
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
    db.session.add(schaeffer)
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
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
