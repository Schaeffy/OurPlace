from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class RequestForm(FlaskForm):
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'receiving_user_id': self.receiving_user_id.data,
            'requesting_user_id:': self.requesting_user_id.data
        }
