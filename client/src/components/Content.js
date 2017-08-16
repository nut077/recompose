import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Home, Categories, Articles, NotFound} from './'
import {Sidebar} from '../containers'

const Content = () => (
  <div className='row'>
    <Sidebar/>
    <div className='col-7'>
      <Switch>
        <Route exact path='/' component={Home}/> {/*exact คือการบอกว่า url ต้องตรงกันเท่านั้น*/}
        <Route path='/categories/*' component={Categories}/>
        <Route path='/articles' component={Articles}/>
        <Route component={NotFound}/>
        <Route/>
      </Switch>
    </div>
  </div>
);

export default Content;