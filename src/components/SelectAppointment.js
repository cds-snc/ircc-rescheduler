import React from 'react'
import Button from '../components/forms/Button'
import rightArrow from '../assets/rightArrow.svg'
import { arrow } from '../styles'
import { Trans } from '@lingui/react'
import FieldSet from './forms/FieldSet'
import { RadioAdapter } from '../components/forms/MultipleChoice'
import { Form, Field } from 'react-final-form'
import PropTypes from 'prop-types';


const AppointmentForm = ({ onSubmit }) => (
    <Form onSubmit={onSubmit} render={({ handleSubmit }) => (<form onSubmit={ handleSubmit }>
        <div>
            <FieldSet id="appointment" legendHidden={ false } >
                <Field type="radio" component={RadioAdapter} label={<Trans>Dummy Appointment Time 1</Trans>} value="1" name="" id="app1" />
                <Field type="radio" component={RadioAdapter} label={<Trans>Dummy Appointment Time 2</Trans>} value="2" name="" id="app2" />
                <Field type="radio" component={RadioAdapter} label={<Trans>Dummy Appointment Time 3</Trans>} value="3" name="" id="app3" />
                <Field type="radio" component={RadioAdapter} label={<Trans>Dummy Appointment Time 4</Trans>} value="4" name="" id="app4" />
            </FieldSet>
        </div>
        <Button type="submit">
            <Trans>Confirm Appointment</Trans>{' '}
            <img src={rightArrow} className={arrow} alt="" />
        </Button>
    </form>)} />
)


AppointmentForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

export default AppointmentForm
