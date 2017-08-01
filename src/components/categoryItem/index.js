import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Header from '../header'
import Footer from '../footer'
import Grid from '../grid'

import './style.css';

import {
  requestItem,
  requestMoreItems
} from '../../modules/items'

class CategoryItem extends Component {
  componentDidMount() {
    !this.props.item && setTimeout(() => this.props.requestItem(this.props.id), 500)
  }

  loadMoreItems = () => {
    const { id, requestMoreItems, offset } = this.props

    requestMoreItems(id, offset)
  }

  openItem = (id) => {
    const { location, history } = this.props;

    history.push(`${location.pathname}/item_${id}`)
  }

  render() {
    const { id, location, history, item, relatedItems, loadingMore } = this.props;

    return (
      <div className="transition-item detail-page">
        <Header
          type="category"
          goBack={history.goBack}
        />
          {item &&
            <main className="item-page-content">
              <div className="item-info">
                <img src={item.url} />
                <h3 className="item-name">{item.name}</h3>
              </div>
              <div className="related-text">
                Related items:
              </div>
              <Grid
                items={relatedItems || []}
                location={location.pathname}
                openItem={this.openItem}
                loadMore={this.loadMoreItems}
                loadingMore={loadingMore}
              />
            </main>
          }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('123', state.items[ownProps.id]);
  const data = state.items[ownProps.id] || {}

  return {
    item: data.item,
    relatedItems: data.relatedItems,
    offset: data.offset,
    loadingMore: state.items.loadingMore
  }
}

const mapDispatchToProps = {
  requestItem,
  requestMoreItems
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem)
