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
    bill = User(
        username='Bill',
        email='bill@aa.io',
        password='4everboosted',
        profile_img='https://i.imgur.com/hVcxPyC.jpg',
        status='one-lining code',
        mood='happy dad',
        brief_you='software engineer and a teacher',
        about_me="I'm Bill and I'm a software engineer and a teacher. I enjoy building programs and teaching new students how to code.",
        music='Prog-rock, Polyphia',
        github='edenspring',
    )
    david = User(
        username='David',
        email='david@aa.io',
        password='eodwizard',
        profile_img='https://i.imgur.com/1fchQtG.png',
        status='learning, coding, teaching',
        mood='chilln',
        brief_you='affinity for the old net',
        about_me="I'm David and I teach students how to be software engineers. ",
        general="building programs, learning haskell",
        music='Prog-rock',
        github='9ziggy9',
    )
    john = User(
        username='John',
        email='john@aa.io',
        password='professorj',
        profile_img='https://i.imgur.com/aES91zj.jpg',
        status='in the matrix',
        mood='chillin',
        brief_you='husband, father, software engineer',
        about_me='Hey my name is John and I am an experienced software engineer',
        here_for="Friends, networking, and coding projects",
        general="Building programs, reading, and spending time with my family",
        books='Data structures and algorithms, machine learning',
        github='JohnCarrera',
    )
    schaeffer = User(
        username='Schaeffer',
        email='schaeffer@aa.io',
        password='oldmanuwu',
        profile_img='https://i.imgur.com/DX3QJLR.jpg',
        status='comme ci, comme ca',
        mood='bing chillin',
        brief_you='codecodecode',
        about_me=''' Hey! My name is Schaeffer and I designed this site.

        It is a love letter to an old social networking site called Myspace.

        Like many people, it holds fond memories and was my first experience interacting with code, though I  really didn't know it at the time.

        Who would have thought that all these years later, I would go from copy-pasting html/css code to building a full stack web application.

        Anyways, thanks for visiting and I hope you enjoy this site!
        ''',
        here_for='Friends, coding opportunities, and to learn more about you!',
        general='Games, coding, food, food, food',
        music='''Early 2000's emo al la Dashboard Confessional, Taking Back Sunday, Brand New, etc.

        Really, all genres ranging from Swedish electro-pop to bluegrass to grindcore/deathmetal.
        ''',
        movies='''I love cinematic adventures.

        Anything with great cinematography, character development, and an interesting story.

        Top 5:
        Columbus (2017)
        Eternal Sunshine of the Spotless Mind (2004)
        Another Earth (2011)
        In Bruges (2008)
        Master and Commander: The Far Side of the World (2003)
        ''',
        television=''' Dark
        The OA (I will never forgive Netflix for canceling this show)
        Maniac
        The Expanse
        Ted Lasso
        ''',
        books='''Jane Austen
        The Expanse series
        Ender's Game
        East of Eden
        The Aubrey/Maturin series

        Been on a post-apocalyptic kick lately
        The Silo Saga
        Sand
        Station Eleven
        A Dog and His Friend at the End of the World
        ''',
        github='Schaeffy'
    )
    kelly = User(
        username='Kelly',
        email='kelly@aa.io',
        password='alldaybedge',
        profile_img='https://i.imgur.com/0W1cRiK.png',
        status='on bed',
        mood='sleepy',
        brief_you='OwO',
        about_me='An introverted extrovert',
        here_for='My future self',
        general='Sleep',
        music='Keshi',
        movies='The free guy, the green book',
        books='Chinese ancient novel',
        heroes='Kelly Shao',
        instagram='ke_shao1',
        github='keshao728'

    )
    andrew = User(
        username='Andrew',
        email='andrew@aa.io',
        password='teleportmaster',
        profile_img='https://i.imgur.com/pXXG6p3.png',
        status='rawr means i love you in dinosaur',
        mood='no u.',
        brief_you='rawrxD',
        about_me='im betmen',
        here_for='schaeffer from ourplace',
        general='friendship :)',
        music='hellogoodby, redjumpsuitapparatus, WEEZER, rise against, artic monkeys, the strokes, my chemical romance, atreyu, HIM, blink182, yellowcard, greenday(before american idiot duhhh, incubus, 30 seconds to mars',
        movies='john hughes, wes anderson, tarantino until about 2010/2011? fantastic beasts is prettier than harry potter',
        television='i didnt have cable growing up as a kid so all i got were the local channel kid programs weekdays after 3pm, saturdays 9am~12pm but in the future, psych, firefly, sherlock, community, iasip, peakyfookinblindersm8, animeonanimeonanimenoticemesempai, gotta check out ted lasso finally after this bootcamp ty',
        books='no ty',
        heroes='"I am not a hero. I am a mere defender of the office. You know who\'s a real hero? Hiro from "Heroes." That\'s a hero."',
        github='k-rewd'
    )
    simon = User(
        username='Simon',
        email='simon@aa.io',
        password='debugking',
        profile_img='https://i.imgur.com/UBTghao.png',
        status='chilling, hopefully working soon',
        mood='Really craving chicken wings',
        brief_you='',
        about_me='Pretty chill yet another asian guy name simon',
        here_for='just say hello!, talk something light or dad jokes works too',
        general='Soccer, Video games, Keyboard',
        music='pop',
        movies='Avatar',
        television='Big band Theory, Friends, Criminal minds',
        github='SimonMTan'
    )

    db.session.add(tom)
    db.session.add(bill)
    db.session.add(david)
    db.session.add(john)
    db.session.add(schaeffer)
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
