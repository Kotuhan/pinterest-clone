import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

import './style.css';

export default ({ goBack }) => {
  return <div className="back-button">
    <FontAwesome
      onClick={goBack}
      name="chevron-left"
    />
  </div>
}
