import React, {Component} from 'react';
class SidebarComponent extends Component {

  state = {
    categories: []
  };

  componentDidMount() {
    fetch('/categories')
      .then(res => res.json())
      .then(({categories}) => this.setState({categories}))
  }

  render() {
    return (
      <div className="col-5">
        <ul>
          {
            this.state.categories.map(({id, title}) =>
              <li key={id}>{title}</li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default SidebarComponent;