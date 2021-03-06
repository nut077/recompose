import React from 'react'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {numericString} from 'airbnb-prop-types'
import {Auth} from '../lib'
import {
  compose,
  setPropTypes,
  withState,
  withProps,
  withHandlers,
  lifecycle
} from 'recompose';

const ArticlesContainer = ({categoryId, articles, pagination: {totalPages, page}}) => (
  <div>
    {
      Auth.getToken() && (
        <Link
          to={`/categories/${categoryId}/articles/new`}
          className='btn btn-sm btn-secondary'>
          Create Article
        </Link>
      )
    }
    <ul className='nav flex-column'>
      {
        articles.map(({id, title}) =>
          <Link
            key={id}
            to={`/articles/${id}`}
            className='nav-link'>{title}</Link>
        )
      }
    </ul>
    <nav className='pagination'>
      {
        Array.from({length: totalPages}).map((_, index) => {
          const currentIndex = index + 1;

          return (
            <li
              key={currentIndex}
              className={classNames(['page-item', {active: currentIndex === +page}])}>
              <Link
                to={`/categories/${categoryId}/articles?page=${currentIndex}`}
                className='page-link'>{currentIndex}</Link>
            </li>
          )
        })
      }
    </nav>
  </div>
);

export default compose(
  setPropTypes({
    match: PropTypes.shape({
      params: PropTypes.shape({
        categoryId: numericString().isRequired
      }).isRequired
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    })
  }),
  withState('articles', 'setArticles', []),
  withState('pagination', 'setPagination', []),
  withProps(props => (
    {
      categoryId: props.match.params.categoryId
    }
  )),
  withHandlers({
    loadArticles: ({setArticles, setPagination, location: {search}, categoryId}) => _ => {
      const page = new URLSearchParams(search).get('page');
      fetch(`/articles?categoryId=${categoryId}&page=${page || 1}`)
        .then(res => res.json())
        .then(({articles, meta}) => {
          setArticles(articles);
          setPagination(meta);
        })
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.loadArticles();
    },
    componentDidUpdate(prevProps) {
      const {match, location} = this.props;
      const {match: prevMatch, location: prevLocation} = prevProps;
      if (match.params.categoryId !== prevMatch.params.categoryId || location.search !== prevLocation.search) {
        this.props.loadArticles();
      }
    }
  })
)(ArticlesContainer)
