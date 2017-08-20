import React from 'react'
import PropTypes from 'prop-types'
import {Auth} from '../lib'
import {AuthForm} from '../components'
import {
  compose,
  setPropTypes,
  withHandlers
} from 'recompose';

const SigninContainer = ({handleFormSubmit}) => (
  <AuthForm
    formName='Signin'
    onSubmit={handleFormSubmit}
  />
);

export default compose(
  setPropTypes({
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  }),
  withHandlers({
    handleFormSubmit: ({history: {goBack}}) => credential => {
      fetch('/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
      })
        .then(({headers}) => Auth.setToken(headers))
        .then(() => goBack());
    }
  })
)(SigninContainer)