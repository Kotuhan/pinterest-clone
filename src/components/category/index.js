import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'

import './style.css';

class Category extends Component {
  render() {
    const { id, location, history } = this.props
    console.log('categoryProps', this.props);
    return (
      <div className="transition-item detail-page">
        {this.props.id}
        <button onClick={history.goBack}>asdasd</button>
        <Link to={`${location.pathname}/category_${id}-${location.key}`}>about</Link>
      </div>
    );
  }
}

export default Category;
