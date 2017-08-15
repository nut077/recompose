import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {numericString} from 'airbnb-prop-types';

class ArticleContainer extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: numericString().isRequired
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    title: '',
    content: ''
  };

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle() {
    const {id} = this.props.match.params;

    fetch(`/articles/${id}`)
      .then(res => res.json())
      .then(({article}) => this.setState({...article}))
  }

  backToPreviousUrl = () => {
    this.props.history.goBack()
  };

  render() {
    const {title, content} = this.state;
    return (
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
        <button className="btn btn-primary btn-sm" onClick={this.backToPreviousUrl}>Back</button>
      </div>
    )
  }
}

export default ArticleContainer;