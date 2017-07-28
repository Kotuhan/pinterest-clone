import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'

import Header from '../header'
import Footer from '../footer'

import './style.css';

class Category extends Component {
  render() {
    const { id, location, history } = this.props

    return (
      <div className="transition-item detail-page">
        <Header
          type="category"
          goBack={history.goBack}
        />
        <main className="categories-page-content">
          <h2 className="main-category">{this.props.id}</h2>
          <Link to={`${location.pathname}/category_${id}-${location.key}`}>about</Link>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Category;
