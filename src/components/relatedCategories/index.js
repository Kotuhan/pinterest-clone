import React, { Component } from "react"
import StackGrid from "react-stack-grid"
import Waypoint from 'react-waypoint'

import './style.css'

class Grid extends Component {
  renderCategories = () => {
    const { categories, openCategory } = this.props

    return categories.map(category => {
      return (
        <div className="ralated-category" onClick={() => openCategory(category.id)}>
          <div>{category.name}</div>
        </div>
      )
    })
  }

  render() {
    const { categories } = this.props

    if (categories.length === 0) return null;

    return (
      <div className="related-categories">
        <div className="overflow-wrapper">
          {this.renderCategories()}
        </div>
      </div>
    );
  }
}

export default Grid
