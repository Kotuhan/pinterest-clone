import React from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

import BackButton from './BackButton'
import SearchBar from './SearchBar'
import InteractButton from './InteractButton'

import './style.css';

export default ({ type, goBack }) => {
  const isMain = type === 'main';
  const isCategory = type === 'category';

  return (
    <header className="header">
      {!isMain && <BackButton  goBack={goBack} />}
      {(isCategory || isMain) && <SearchBar />}
      {(!isCategory && isMain) && <InteractButton />}
      </header>
  )
}
