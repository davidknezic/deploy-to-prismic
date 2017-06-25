import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from '../containers/Profile'
import Repository from '../containers/Repository'
import Source from '../containers/Source'
import Progress from '../containers/Progress'

@connect(state => ({
}), {
})
export default class DeployContainer extends Component {
  render() {
    return (
      <div role="main" className="deploy">
        <Source />
        <Profile />
        <Repository />
        <Progress />
        <style jsx>{`
          .deploy {
            padding: 60px 0;
          }
        `}</style>
      </div>
    )
  }
}
