import React from 'react';
import PropTypes from 'prop-types';
import {numericString} from 'airbnb-prop-types';
import {Auth} from '../lib';
import {ArticleForm} from '../components';
import {
  compose,
  setPropTypes,
  withHandlers
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
  withHandlers({
    createArticle: ({match: {params: {categoryId}}, history: {push}}) => article => {
      fetch('/articles', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': Auth.getToken()
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
)(NewArticleContainer);