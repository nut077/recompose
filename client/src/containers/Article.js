import React, {Component} from 'react';

class ArticleContainer extends Component {
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