import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

import './style.css';

export default ({ onClick }) => {
  return <div className="interact-button">
    <FontAwesome
      className="interact-icon"
      name='camera'
      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
    />
  </div>
}
