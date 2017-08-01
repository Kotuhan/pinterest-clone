import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Header from '../header'
import Footer from '../footer'
import RelatedCategories from '../relatedCategories'
import loader from '../../assets/loader.gif'

import Grid from '../grid'

import './style.css';

import {
  requestCategory,
  requestMoreItems,
} from '../../modules/categories'

class Category extends Component {
  componentDidMount() {
    const { id, requestCategory, items } = this.props

    //wait for animation finish
    items.length === 0 && setTimeout(() => requestCategory(id), 500)
  }

  openItem = (id) => {
    const { location, history } = this.props;

    history.push(`${location.pathname}/item_${id}`)
  }

  openCategory = (id) => {
    const { location, history } = this.props;

    history.push(`${location.pathname}/category_${id}`)
  }

  loadMoreItems = () => {
    const { id, requestMoreItems, offset } = this.props

    requestMoreItems(id, offset)
  }

  render() {
    const { id, location, history, items, loadingMore, relatedCategories, isFetching } = this.props;

    return (
      <div className="transition-item detail-page">
        <Header
          type="category"
          goBack={history.goBack}
        />
          {isFetching || items.length === 0
            ?
              (
                <img src={loader} />
              )
            :
              (
                <main className="category-page-content">
                  <h2 className="main-category">{this.props.id}</h2>
                  <RelatedCategories
                    categories={relatedCategories}
                    openCategory={this.openCategory}
                  />
                  <Grid
                    items={items || []}
                    location={location.pathname}
                    openItem={this.openItem}
                    loadMore={this.loadMoreItems}
                    loadingMore={loadingMore}
                  />
                </main>
              )
          }
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
    isFetching: state.categories.isFetching,
    loadingMore: state.categories.loadingMore,
    relatedCategories: data.relatedCategories || []
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
