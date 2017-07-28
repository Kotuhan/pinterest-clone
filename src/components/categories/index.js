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
  { label: 'Popular' },
  { label: 'Popular1' },
  { label: 'Popular2' },
  { label: 'Popular3' },
  { label: 'Popular4' },
  { label: 'Popular5' },
  { label: 'Popular6' },
  { label: 'Popular7' },
  { label: 'Popular7' },
  { label: 'Popular8' },
  { label: 'Popular9' },
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
          return <Link key={i} to="category_123123">{caregory.label}</Link>
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
