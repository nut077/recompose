import React from 'react';
import {Route} from 'react-router-dom';
import {Home, Categories} from './'
import {Sidebar} from "../containers"

const Content = () => (
  <div className="row">
    <Sidebar/>
    <div className="col-7">
      <Route path="/" component={Home}/>
      <Route path="/categories/*" component={Categories}/>
    </div>
  </div>
);

export default Content;