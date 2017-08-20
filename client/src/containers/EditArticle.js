import React from 'react'
import PropTypes from 'prop-types'
import {numericString} from 'airbnb-prop-types'
import {withAuth, withAuthCheck} from '../lib'
import {ArticleForm} from '../components'
import {
  compose,
  setPropTypes,
  withState,
  withProps,
  withHandlers,
  flattenProp,
  onlyUpdateForKeys,
  lifecycle
} from 'recompose';

const EditArticleContainer =
  ({
     article,
     editArticle
   }) => (
    <ArticleForm
      {...article}
      formType='Edit'
      onSubmit={editArticle}
    />
  );

export default compose(
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  }),
  withAuth,
  withAuthCheck,
  flattenProp('auth'),
  withState('article', 'setArticle', {title: '', content: ''}),
  withProps(props => ({accessToken: props.auth.getToken()})),
  withHandlers({
    loadArticle:
      ({
         match: {params: {id}},
         setArticle
       }) => () => {
        fetch(`/articles/${id}`)
          .then(res => res.json())
          .then(({article}) => setArticle(article))
      },
    editArticle:
      ({
         match: {params: {id}},
         history: {push},
         accessToken
       }) => article => {
        fetch(`/articles/${id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken
          },
          body: JSON.stringify({
            ...article
          })
        }).then(res => res.json())
          .then(({article: {id}}) =>
            push(`/articles/${id}`)
          )
      }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadArticle();
    }
  }),
  onlyUpdateForKeys(['accessToken', 'article'])
)(EditArticleContainer)