import React from 'react'
import { goBack, push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../header'
import Footer from '../footer'

import './style.css';

import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/incrementing'

const CATEGORIES = [
  { label: "Women's Fashion", id: 'women'},
  { label: "Women's Clothes", id: "womens-clothes" },
  { label: "Beauty Products", id: 'womens-beauty '},
  { label: "Men's Fashion", id: 'men' },
  { label: 'Men\'s Shoes', id: "mens-shoes" },
  { label: 'Nursery', id: "nursery-kids-and-baby" },
  { label: 'Kitchen', id: 'kitchen' },
  { label: 'Lighting', id: "accent-lighting" },
  { label: 'Tabletop', id: 'dining' },
  { label: 'Baby Gear', id: 'baby-gear' },
  { label: "Home & Living", id: 'living' },
]

const Categories = props => (
  <div className="categories-page">
    <Header
      type="main"
      onClick={goBack}
    />
    <main className="categories-page-content">
      <h2 className="main-category">Popular</h2>
      <h3>All categories</h3>
      <div className="all-categories">
        {CATEGORIES.map((caregory, i) => {
          return <Link key={i} to={`category_${caregory.id}`}>{caregory.label}</Link>
        })}
      </div>
    </main>
    <Footer />
  </div>
)

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories)
