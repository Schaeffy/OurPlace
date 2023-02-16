from app.models import db, ProfilePic, environment, SCHEMA

def seed_profile_pics():
    pic1 = ProfilePic(
        user_id=8,
        url='https://ourplace.s3.amazonaws.com/c92c87e944054f8892f481109607f881.png'
    )
    pic2 = ProfilePic(
        user_id=9,
        url='https://ourplace.s3.amazonaws.com/efe4511885de4a79b951ca5228350942.png'
    )
    pic3 = ProfilePic(
        user_id=6,
        url='https://ourplace.s3.amazonaws.com/098defc2e88a4dfdbb6d60044816b8f8.jpg'
    )
    pic4 = ProfilePic(
        user_id=2,
        url='https://ourplace.s3.amazonaws.com/96073247e2eb48eda7b57bbf332286e7.png'
    )
    pic5 = ProfilePic(
        user_id=13,
        url='https://ourplace.s3.amazonaws.com/818f1bb742e14e7fa4f257ce8d3b4247.jpg'
    )
    pic6 = ProfilePic(
        user_id=12,
        url='https://ourplace.s3.amazonaws.com/cd34032f5bd14767bca1700460c1c369.png'
    )
    pic7 = ProfilePic(
        user_id=1,
        url='https://ourplace.s3.amazonaws.com/63c94886ec7e4ea5860664451d34cd0c.png'
    )
    pic8 = ProfilePic(
        user_id=7,
        url='https://ourplace.s3.amazonaws.com/c482a705d28a4ee29c68385a69cb1b29.jpg'
    )
    pic9 = ProfilePic(
        user_id=4,
        url='https://ourplace.s3.amazonaws.com/79e01ce521fa409ca908b523cbf1cd66.png'
    )
    pic10 = ProfilePic(
        user_id=5,
        url='https://ourplace.s3.amazonaws.com/d8ec475820dc4fadb14346f1ba8fc468.png'
    )
    pic11 = ProfilePic(
        user_id=10,
        url='https://ourplace.s3.amazonaws.com/a664bb3f3a89418580dc54084be2bf01.png'
    )
    pic12 = ProfilePic(
        user_id=11,
        url='https://ourplace.s3.amazonaws.com/2f843f39500547b3985364b69eac32a6.png'
    )
    pic13 = ProfilePic(
        user_id=3,
        url='https://ourplace.s3.amazonaws.com/92d93d18094c4a20b977f5782d77cddc.jpg'
    )

    db.session.add(pic1)
    db.session.add(pic2)
    db.session.add(pic3)
    db.session.add(pic4)
    db.session.add(pic5)
    db.session.add(pic6)
    db.session.add(pic7)
    db.session.add(pic8)
    db.session.add(pic9)
    db.session.add(pic10)
    db.session.add(pic11)
    db.session.add(pic12)
    db.session.add(pic13)
    db.session.commit()



def undo_profile_pic():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.profile_pics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM profile_pics")

    db.session.commit()
