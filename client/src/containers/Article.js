import React from 'react';
import PropTypes from 'prop-types';
import {numericString} from 'airbnb-prop-types';
import {Auth} from '../lib';
import {Link} from 'react-router-dom';
import {
  compose,
  setPropTypes,
  withState,
  withProps,
  withHandlers,
  lifecycle
} from 'recompose'

const ArticleContainer = ({
    article: {title, content},
    id,
    backToPreviousUrl
  }) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
    <button
      className='btn btn-primary btn-sm'
      onClick={backToPreviousUrl}>
      Back
    </button>
    {
      Auth.getToken() && (
        <Link
          to={`/articles/${id}/edit`}
          className='btn btn-sm btn-secondary'>
          Edit
        </Link>
      )
    }
  </div>
);

export default compose(
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  }),
  withState('article', 'setArticle', {title: '', content: ''}),
  withProps(props => ({id: props.match.params.id})),
  withHandlers({
    loadArticle: ({id, setArticle}) => _ => {
      fetch(`/articles/${id}`)
        .then(res => res.json())
        .then(({article}) => setArticle(article))
    },
    backToPreviousUrl: ({history: {goBack}}) => _ => {
      goBack();
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadArticle();
    }
  })
)(ArticleContainer);