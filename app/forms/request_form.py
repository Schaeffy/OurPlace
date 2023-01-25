from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class RequestForm(FlaskForm):
    submit = SubmitField('Submit')

    def to_dict(self):
        return {
            'requester_id': self.requester_id.data,
            'requested_id': self.requested_id.data,
        }
