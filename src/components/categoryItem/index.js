import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import Header from '../header'
import Footer from '../footer'
import Virtualized from '../mansonry'

import './style.css';

import {
  requestItem,
} from '../../modules/items'

class CategoryItem extends Component {
  componentDidMount() {
    // this.props.requestItem(this.props.id)
    setTimeout(() => this.props.requestItem(this.props.id), 1000)
  }

  render() {
    const { id, location, history, item } = this.props;
    return (
      <div className="transition-item detail-page">
        <Header
          type="category"
          goBack={history.goBack}
        />
          {item &&
            <main className="item-page-content">
              <img src={item.image.sizes.Medium.url} />
              <h2 className="item-name">{item.name}</h2>
            </main>
          }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    item: state.items[ownProps.id]
  }
}

const mapDispatchToProps = {
  requestItem
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryItem)
