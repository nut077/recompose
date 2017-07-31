import React from 'react';
import {Route} from 'react-router-dom';
import {Home} from './';

const App = () => (
  <div className="container">
    <Route path="/" component={Home}/>
    <Route path="/children" children={() => <h1>Children</h1>}/>
  </div>
);

export default App;