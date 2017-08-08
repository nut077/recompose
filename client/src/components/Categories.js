import React from 'react';
import {Route} from 'react-router-dom';
import {Articles} from "../containers";

const Categories = () => (
  <div>
    <Route
      path="/categories/:categoryId/articles"
      component={Articles}/>
  </div>
);

export default Categories;