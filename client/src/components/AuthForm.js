import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  setPropTypes,
  withState,
  withHandlers
} from 'recompose';

const AuthForm = ({formName, onFieldChange, onSubmit}) => (
  <form>
    <h2 className='text-center'>{formName} Form</h2>
    <hr/>
    <div className='form-group'>
      <label htmlFor='email'>Email address</label>
      <input
        type='email'
        className='form-control'
        id='email'
        name='email'
        placeholder='Enter email'
        onChange={onFieldChange}
      />
    </div>
    <div className='form-group'>
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        className='form-control'
        id='password'
        name='password'
        placeholder='Enter password'
        onChange={onFieldChange}
      />
    </div>
    <button
      type='submit'
      className='btn btn-primary'
      onClick={onSubmit}>
      {formName}
    </button>
  </form>
);

export default compose(
  setPropTypes({
    formName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  }),
  withState('formValues', 'setFormValues', {email: '', password: ''}),
  withHandlers({
    onSubmit: ({onSubmit, formValues}) => event => {
      event.preventDefault();
      onSubmit(formValues);
    },
    onFieldChange: ({setFormValues, formValues}) => ({target: {name, value}}) => {
      setFormValues({...formValues, [name]: value});
    }
  })
)(AuthForm);