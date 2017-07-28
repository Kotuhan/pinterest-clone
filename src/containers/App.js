import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import ScreensHOC from '../HOC/ScreensHoc'
import PageTransition from 'react-router-page-transition';
import Categories from '../components/categories'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <PageTransition>
            <Switch>
              <Route exact path="/" component={Categories} />
              <Route path="*/:type_id" component={ScreensHOC} />
            </Switch>
          </PageTransition>
        </main>
      </div>
    );
  }
}

export default App;
