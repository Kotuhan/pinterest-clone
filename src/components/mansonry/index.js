import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  AutoSizer
} from 'react-virtualized';

// Array of images with captions



class Virtualized extends Component {
  constructor(props) {
    super(props)

    this._columnCount = 0;

    this._cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: 200,
    });

    this._columnHeights = {};

    this.state = {
      columnWidth: 200,
      height: 550,
      gutterSize: 20,
      windowScrollerEnabled: false
    };
  }


  _calculateColumnCount = () => {
    const { columnWidth, gutterSize } = this.state;

    this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
  }

  _cellRenderer = ({ index, key, parent, style }) => {
    const { items } = this.props;
    const { columnWidth } = this.state;
    const datum = items[index % items.length];

    if (!datum) return null;

    return (
      <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
        <div
          className="cell"
          style={{
            ...style,
            width: columnWidth
          }}
        >
          <img
            src={datum.url}
            style={{
              height: datum.height,
              width: datum.width
            }}
          />
          <div>{datum.name}</div>
        </div>
      </CellMeasurer>
    );
  }

  _initCellPositioner = () => {
    if (typeof this._cellPositioner === "undefined") {
      const { columnWidth, gutterSize } = this.state;

      this._cellPositioner = createMasonryCellPositioner({
        cellMeasurerCache: this._cache,
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize
      });
    }
  }

  _onResize = ({ width }) => {
    this._width = width;

    this._columnHeights = {};
    this._calculateColumnCount();
    this._resetCellPositioner();
    this._masonry.recomputeCellPositions();
  }

  _renderAutoSizer = ({ height, scrollTop }) => {
    this._height = height;
    this._scrollTop = scrollTop;

    return (
      <AutoSizer
        disableHeight
        onResize={this._onResize}
        scrollTop={this._scrollTop}
      >
        {this._renderMasonry}
      </AutoSizer>
    );
  }

  _renderMasonry = ({ width }) => {
    this._width = width;

    this._calculateColumnCount();
    this._initCellPositioner();

    const { height, windowScrollerEnabled } = this.state;

    return (
      <Masonry
        autoHeight={windowScrollerEnabled}
        cellCount={1000}
        cellMeasurerCache={this._cache}
        cellPositioner={this._cellPositioner}
        cellRenderer={this._cellRenderer}
        height={windowScrollerEnabled ? this._height : height}
        ref={this._setMasonryRef}
        scrollTop={this._scrollTop}
        width={width}
      />
    );
  }

  _resetCellPositioner = () => {
    const { columnWidth, gutterSize } = this.state;

    this._cellPositioner.reset({
      columnCount: this._columnCount,
      columnWidth,
      spacer: gutterSize
    });
  }

  _setMasonryRef = (ref) => {
    this._masonry = ref;
  }

  render() {
    const { cache, props, state, cellPositioner, cellRenderer } = this;
    const {
      columnWidth,
      height,
      gutterSize,
      windowScrollerEnabled
    } = this.state;

    return (
      this._renderAutoSizer({ height })
    );
  }
}

export default Virtualized
