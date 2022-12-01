from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ProfileForm(FlaskForm):
    profile_img = StringField('profile_img')
    profile_name = StringField('profile_name')
    status = StringField('status')
    mood = StringField('mood')
    brief_you = StringField('brief_you')
    hometown = StringField('hometown')
    ethnicity = StringField('ethnicity')
    occupation = StringField('occupation')
    about_me = TextAreaField('about_me')
    general = TextAreaField('general')
    here_for = TextAreaField('here_for')
    music = TextAreaField('music')
    movies = TextAreaField('movies')
    television = TextAreaField('television')
    books = TextAreaField('books')
    heroes = TextAreaField('heroes')
    instagram = StringField('instagram')
    snapchat = StringField('snapchat')
    github = StringField('github')
    twitter = StringField('twitter')
    youtube = StringField('youtube')
    twitch = StringField('twitch')
    tiktok = StringField('tiktok')
    soundcloud = StringField('soundcloud')
    spotify = StringField('spotify')
    pintrest = StringField('pintrest')
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'profile_img': self.profile_img.data,
            'profile_name': self.profile_name.data,
            'status': self.status.data,
            'mood': self.mood.data,
            'brief_you': self.brief_you.data,
            'hometown': self.hometown.data,
            'ethnicity': self.ethnicity.data,
            'occupation': self.occupation.data,
            'about_me': self.about_me.data,
            'here_for': self.here_for.data,
            'general': self.general.data,
            'music': self.music.data,
            'movies': self.movies.data,
            'television': self.television.data,
            'books': self.books.data,
            'heroes': self.heroes.data,
            'instagram': self.instagram.data,
            'snapchat': self.snapchat.data,
            'github': self.github.data,
            'twitter': self.twitter.data,
            'youtube': self.youtube.data,
            'twitch': self.twitch.data,
            'tiktok': self.tiktok.data,
            'soundcloud': self.soundcloud.data,
            'spotify': self.spotify.data,
            'pintrest': self.pintrest.data
        }
