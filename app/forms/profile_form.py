from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    profile_img = StringField('profile_img', validators=[DataRequired()])
    profile_name = StringField('profile_name', validators=[DataRequired()])
    status = StringField('status', validators=[DataRequired()])
    mood = StringField('mood', validators=[DataRequired()])
    brief_you = StringField('brief_you', validators=[DataRequired()])
    hometown = StringField('hometown', validators=[DataRequired()])
    ethnicity = StringField('ethnicity', validators=[DataRequired()])
    occupation = StringField('occupation', validators=[DataRequired()])
    about_me = TextAreaField('about_me', validators=[DataRequired()])
    music = TextAreaField('music', validators=[DataRequired()])
    movies = TextAreaField('movies', validators=[DataRequired()])
    television = TextAreaField('television', validators=[DataRequired()])
    books = TextAreaField('books', validators=[DataRequired()])
    heroes = TextAreaField('heroes', validators=[DataRequired()])
    instagram = StringField('instagram', validators=[DataRequired()])
    snapchat = StringField('snapchat', validators=[DataRequired()])
    github = StringField('github', validators=[DataRequired()])
    twitter = StringField('twitter', validators=[DataRequired()])
    youtube = StringField('youtube', validators=[DataRequired()])
    twitch = StringField('twitch', validators=[DataRequired()])
    tiktok = StringField('tiktok', validators=[DataRequired()])
    soundcloud = StringField('soundcloud', validators=[DataRequired()])
    spotify = StringField('spotify', validators=[DataRequired()])
    pintrest = StringField('pintrest', validators=[DataRequired()])
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'username': self.username.data,
            'email': self.email.data,
            'profile_img': self.profile_img.data,
            'profile_name': self.profile_name.data,
            'status': self.status.data,
            'mood': self.mood.data,
            'brief_you': self.brief_you.data,
            'hometown': self.hometown.data,
            'ethnicity': self.ethnicity.data,
            'occupation': self.occupation.data,
            'about_me': self.about_me.data,
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
