import React, { Component } from 'react';

import Category from '../components/category'
import Item from '../components/categoryItem'

class ScreensHoc extends Component {

  chooseScreen = () => {
    const { match, history, location } = this.props

    const params =  match.params.type_id.split('_')

    const type = params[0];
    const id = params[1];

    if (type === 'category') {
      return <Category id={id} history={history} location={location} />
    } else {
      return <Item id={id} />
    }
  }

  render() {
    console.log('pasdfads', this.props)
    return this.chooseScreen()
  }
}

export default ScreensHoc
