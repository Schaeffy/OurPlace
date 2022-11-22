from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class BlogPostForm(FlaskForm):
    blog_title = StringField('title', validators=[DataRequired()])
    blog_body = TextAreaField('body', validators=[DataRequired()])
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'blog_title': self.blog_title.data,
            'blog_body': self.blog_body.data,
        }
