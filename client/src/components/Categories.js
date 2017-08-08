import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

const Categories = () => (
  <Route path="/categories" component={Categories}/>
);

export default Categories;