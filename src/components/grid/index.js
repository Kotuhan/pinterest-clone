import React, { Component } from "react"
import StackGrid from "react-stack-grid"
import Waypoint from 'react-waypoint'

import loader from '../../assets/loader.gif'

import './style.css'

class Grid extends Component {

  state = {
    hidden: true
  }

  show = () => {
    setTimeout(() => this.setState({ hidden: false }), 700);
  }

  componentWillMount() {
    this.show();
  }

  renderItems = () => {
    const { items, openItem } = this.props
    return items.map(item =>
      (<div
        key={item.id}
        style={{minHeight: '100px'}}
        onClick={() => openItem(item.id)}
      >
        <img
          src={item.url}
        />
        <div>{item.name}</div>
      </div>)
    )
  }


  loadMoreItems = () => {
    const { items, loadMore } = this.props;

    //prevent loading more while no items yet
    items.length > 0 && loadMore()
  }

  renderWaypoint = () => {
    if (!this.props.loadingMore) {
      return (
        <Waypoint
          onEnter={this.loadMoreItems}
        />
      );
    }
  }

  render() {
    const { loadingMore } = this.props

    if (this.state.hidden) return <img className="loader" src={loader} />;

    return (
      <div style={{width: '100%'}}>
        <StackGrid
           duration={0}
           columnWidth={150}
           ref={(el) => this.grid = el}
           monitorImagesLoaded
           style={{width: '100%'}}
         >
           {this.renderItems()}
           {this.renderWaypoint()}
         </StackGrid>
         {loadingMore && <img src={loader} />}
      </div>
    );
  }
}

export default Grid
