import React from 'react';
import {Route} from 'react-router-dom';
import {Article} from "../containers";

const Articles = () => (
  <div>
    <Route path="/articles/:id" component={Article}/>
  </div>
);

export default Articles;