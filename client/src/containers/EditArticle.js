import React from 'react';
import PropTypes from 'prop-types';
import {numericString} from 'airbnb-prop-types';
import {Auth} from '../lib';
import {ArticleForm} from '../components';
import {
  compose,
  setPropTypes,
  withState,
  withHandlers,
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
  withState('article', 'setArticle', {title: '', content: ''}),
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
         history: {push}
       }) => article => {
        fetch(`/articles/${id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': Auth.getToken()
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
  })
)(EditArticleContainer);