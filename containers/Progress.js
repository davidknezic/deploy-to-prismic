import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from '../components/Container'
import Subtitle from '../components/Subtitle'
import Button from '../components/Button'

@connect(state => ({
  repository: state.repositories.entities ? state.repositories.entities[state.repositories.selected] || null : null,
}), {
})
export default class ProgressContainer extends Component {
  constructor(props) {
    super(props)
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
        <Button>Deploy to prismic.io</Button>
      </Container>
    )
  }
}
