import React from 'react'
import PropTypes from 'prop-types'
import {numericString} from 'airbnb-prop-types'
import {withAuth, withAuthCheck} from '../lib'
import {ArticleForm} from '../components'
import {
  compose,
  setPropTypes,
  withHandlers,
  flattenProp
} from 'recompose';

const NewArticleContainer = ({createArticle}) => (
  <ArticleForm
    formType='Create'
    onSubmit={createArticle}
  />
);

export default compose(
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: numericString().isRequired
      }).isRequired
    }).isRequired
  }),
  withAuth,
  withAuthCheck,
  flattenProp('auth'),
  withHandlers({
    createArticle:
      ({
         match: {params: {categoryId}},
         history: {push},
         getToken
       }) => article => {
        fetch('/articles', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': getToken()
          },
          body: JSON.stringify({
            ...article, categoryId: categoryId
          })
        }).then(res => res.json())
          .then(({article: {id}}) =>
            push(`/articles/${id}`)
          )
      }
  })
)(NewArticleContainer)