import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deploy } from '../store/progress'
import Container from '../components/Container'
import Subtitle from '../components/Subtitle'
import Button from '../components/Button'

@connect(state => ({
  customTypes: state.source ? state.source.customTypes : null,
  progress: state.progress,
  repository: state.repositories.entities ? state.repositories.entities[state.repositories.selected] || null : null,
  token: state.auth,
}), {
  deploy,
})
export default class ProgressContainer extends Component {
  deploy() {
    this.props.deploy({
      customTypes: this.props.customTypes,
      repository: this.props.repository.name,
      token: this.props.token,
    })
  }

  render() {
    return (
      <Container>
        <Subtitle>
          <span>3. Deploy</span>
          {this.props.repository ? (
            <span> to <a href={this.props.repository.url}>{this.props.repository.name}</a></span>
          ) : null}
        </Subtitle>
        {!this.props.progress ? (
          <Button onClick={this.deploy.bind(this)}>Deploy to prismic.io</Button>
        ) : (
          <div>{JSON.stringify(this.progress)}</div>
        )}
      </Container>
    )
  }
}
