import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deploy } from '../store/progress'
import Container from '../components/Container'
import Subtitle from '../components/Subtitle'
import Button from '../components/Button'
import ProgressList from '../components/ProgressList'
import ProgressItem from '../components/ProgressItem'

@connect(state => ({
  customTypes: state.source ? state.source.customTypes : null,
  progress: state.progress,
  customTypeProgress: state.progress ? state.progress.customTypes : null,
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
        {!this.props.repository ? null : !this.props.progress ? (
          <Button onClick={this.deploy.bind(this)}>Deploy to prismic.io</Button>
        ) : (
          <ProgressList>
            {this.props.customTypeProgress && this.props.customTypes ? Object.keys(this.props.customTypeProgress).map(customTypeName => (
              <ProgressItem
                key={customTypeName}
                state={this.props.customTypeProgress[customTypeName]}
              >
                {this.props.customTypeProgress[customTypeName] === 'deploying' ? (
                  <span>Deploying custom type <em>{this.props.customTypes[customTypeName]['@title']}</em></span>
                ) : this.props.customTypeProgress[customTypeName] === 'success' ? (
                  <span>Deployed custom type <em>{this.props.customTypes[customTypeName]['@title']}</em></span>
                ) : this.props.customTypeProgress[customTypeName] === 'failed' ? (
                  <span>Failed deploying custom type <em>{this.props.customTypes[customTypeName]['@title']}</em></span>
                ) : null}
              </ProgressItem>
            )) : null}
          </ProgressList>
        )}
      </Container>
    )
  }
}
