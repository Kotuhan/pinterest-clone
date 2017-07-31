import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import Header from '../header'
import Footer from '../footer'
import Virtualized from '../mansonry'

import './style.css';

import {
  requestCategory,
} from '../../modules/categories'

class Category extends Component {
  componentDidMount() {
    console.log('this.props.id', this.props.id);
    this.props.requestCategory(this.props.id)
  }


  render() {
    const { id, location, history, items } = this.props;
    console.log('items', items)
    return (
      <div className="transition-item detail-page">
        <Header
          type="category"
          goBack={history.goBack}
        />
        <main className="category-page-content">
          <h2 className="main-category">{this.props.id}</h2>
          <Virtualized items={items || []} />
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const formattedList = state.categories[ownProps.id]
    ? state.categories[ownProps.id].map(item => {
        const { name, description, image } = item
        const { height, width, url } = image.sizes.Medium

        return { name, description, url, width, height }
      })
    : []

  return {
    items: formattedList
  }
}

const mapDispatchToProps = {
  requestCategory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
