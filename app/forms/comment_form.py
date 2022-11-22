from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired, ValidationError


class CommentForm(FlaskForm):
    comment_body = TextAreaField('body', validators=[DataRequired()])
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'comment_body': self.comment_body.data,
        }
