import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapObjIndexed, values } from 'ramda'
import Container from '../components/Container'
import Title from '../components/Title'
import ErrorMessage from '../components/ErrorMessage'

@connect(state => ({
  url: state.url,
  source: state.source,
}), {
})
export default class Source extends Component {
  render() {
    return this.props.source === null ? (
      <div />
    ) : this.props.source === 'fetching' ? (
      <Container>
        <Title>One-click deploy ...</Title>
      </Container>
    ) : this.props.source === 'failed' ? (
      <Container>
        <Title>One-click deploy</Title>
        <ErrorMessage>The provided repository seems to be invalid.</ErrorMessage>
      </Container>
    ) : (
      <Container>
        <Title>One-click deploy <a href={this.props.url}>{this.props.source.owner}/{this.props.source.repo}</a></Title>
        {false ? (
          <ul>
            {values(mapObjIndexed((customType, key) => (
              <li key={key}>{customType['@title']}</li>
            ), this.props.source.customTypes))}
          </ul>
        ) : null}
      </Container>
    )
  }
}
