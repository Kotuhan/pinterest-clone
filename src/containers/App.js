import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import ScreensHOC from '../HOC/ScreensHoc'
// import PageTransition from 'react-router-page-transition';
import { RouteTransition } from 'react-router-transition';
import Categories from '../components/categories'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route render={({location, history, match}) => {
            const isBack = history.action === 'POP' ? 1 : -1

            return (
              <RouteTransition
                pathname={location.pathname}
                atEnter={{ translateX: -100 * isBack }}
                atLeave={{ translateX: 100 * isBack }}
                atActive={{ translateX: 0 }}
                mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
              >
                <Switch>
                  <Route exact path="/" component={Categories} />
                  <Route path="*/:type_id" component={ScreensHOC} />
                </Switch>
              </RouteTransition>
              );
            }}
          />
      </div>
    );
  }
}

export default App;
