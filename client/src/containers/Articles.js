import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ArticlesContainer extends Component {

  state = {
    articles: []
  };

  componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevProps) {
    const {match} = this.props;
    const {match: prevMatch} = prevProps;
    if (match.params.categoryId !== prevMatch.params.categoryId) {
      this.loadArticles();
    }
  }

  loadArticles() {
    const {categoryId} = this.props.match.params;

    fetch(`/articles?categoryId=${categoryId}`)
      .then(res => res.json())
      .then(({articles}) => this.setState({articles}))
  }

  render() {
    const {articles} = this.state;
    return (
      <ul className="nav flex-column">
        {
          articles.map(({id, title}) =>
            <Link
              key={id}
              to={`/articles/${id}`}
              className="nav-link">{title}</Link>
          )
        }
      </ul>
    )
  }
}

export default ArticlesContainer;