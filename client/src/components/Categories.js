import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Articles, NewArticle} from "../containers";

const Categories = () => (
  <Switch>
    <Route
      path="/categories/:categoryId/articles/new"
      component={NewArticle}/>
    <Route
      path="/categories/:categoryId/articles"
      component={Articles}/>
  </Switch>
);

export default Categories;