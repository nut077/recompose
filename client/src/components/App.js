import React from 'react';
import {Route} from 'react-router-dom';
import {Content} from './';

const App = () => (
  <div className="container">
    <Route component={Content}/>
  </div>
);

export default App;