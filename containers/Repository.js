import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRepository, selectRepository } from '../store/repositories'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import Repository from '../components/Repository'
import RepositoryList from '../components/RepositoryList'
import CreateRepository from '../components/CreateRepository'
import Modal from '../components/Modal'
import Subtitle from '../components/Subtitle'

@connect(state => ({
  repositories: state.repositories.entities,
  selectedRepository: state.repositories.selected,
  token: state.auth,
}), {
  createRepository,
  selectRepository,
})
export default class RepositoryContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      modalOpen: false,
    }
  }

  handleNameChange(name) {
    this.setState({ ...this.state, name: name })
  }

  handleNewRepositorySubmit() {
    console.log(this.state.name, this.props.token)

    this.props.createRepository({
      token: this.props.token,
      name: this.state.name,
    })
      .then(() => {
        this.setState({ ...this.state, name: '' })
      })
  }

  handleCreateRepositoryClick() {
    this.setState({ ...this.state, modalOpen: true })
  }

  handleModalCloseClick() {
    this.setState({ ...this.state, modalOpen: false })
  }

  render() {
    return (
      <div>
        <Container>
          <Subtitle>2. Select your <a href="https://prismic.io">prismic.io</a> repository to deploy to</Subtitle>
        </Container>
        {this.props.repositories ? (
          <Container unpadded>
            <RepositoryList>
              <CreateRepository onClick={this.handleCreateRepositoryClick.bind(this)} />

              {['fetching', 'failed'].indexOf(this.props.repositories) < 0 ? Object.keys(this.props.repositories).map(key => (
                this.props.repositories[key] === 'fetching' ? (
                  <span>FETCHING...</span>
                ) : this.props.repositories[key] === 'failed' ? (
                  <span>FAILED</span>
                ) : (
                  <Repository
                    key={key}
                    name={this.props.repositories[key].displayName}
                    avatarUrl={this.props.repositories[key].avatarUrl}
                    avatarColor={this.props.repositories[key].avatarColor}
                    userCount={this.props.repositories[key].userCount}
                    isSelected={key === this.props.selectedRepository}
                    onSelect={() => this.props.selectRepository(key)} />
                )
              )) : null}
            </RepositoryList>
            <Modal onClose={this.handleModalCloseClick.bind(this)} open={this.state.modalOpen}>
              <Input type="name" placeholder="Repository name" onChange={this.handleNameChange.bind(this)} />
              <Button type="submit" label="Create repository" onClick={this.handleNewRepositorySubmit.bind(this)} />
            </Modal>
          </Container>
        ) : null}
      </div>
    )
  }
}
