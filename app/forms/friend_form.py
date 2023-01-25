from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class FriendForm(FlaskForm):
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'user1_id': self.user1_id.data,
            'user2_id': self.user2_id.data,
        }
