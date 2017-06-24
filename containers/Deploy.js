import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '../containers/Profile'
import Repository from '../containers/Repository'
import Source from '../containers/Source'

@connect(state => ({
}), {
})
export default class Deploy extends Component {
  render() {
    return (
      <div role="main">
        <Source />
        <Profile />
        <Repository />
      </div>
    )
  }
}
