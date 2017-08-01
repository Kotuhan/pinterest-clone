import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Header from '../header'
import Footer from '../footer'
import Grid from '../grid'

import './style.css';

import {
  requestCategory,
  requestMoreItems,
} from '../../modules/categories'

class Category extends Component {
  componentDidMount() {
    const { id, requestCategory } = this.props

    //wait for animation finish
    setTimeout(() => requestCategory(id), 500)
  }

  openItem = (id) => {
    const { location, history } = this.props;

    history.push(`${location.pathname}/item_${id}`)
  }

  loadMoreItems = () => {
    const { id, requestMoreItems, offset } = this.props

    requestMoreItems(id, offset)
  }

  render() {
    const { id, location, history, items, loadingMore } = this.props;

    return (
      <div className="transition-item detail-page">
        <Header
          type="category"
          goBack={history.goBack}
        />
        <main className="category-page-content">
          <h2 className="main-category">{this.props.id}</h2>
          <Grid
            items={items || []}
            location={location.pathname}
            openItem={this.openItem}
            loadMore={this.loadMoreItems}
            loadingMore={loadingMore}
          />
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = state.categories[ownProps.id] || {};

  return {
    items: data.items || [],
    offset: data.offset || 0,
    isLoading: state.categories.isLoading,
    loadingMore: state.categories.loadingMore
  }
}

const mapDispatchToProps = {
  requestCategory,
  requestMoreItems
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
