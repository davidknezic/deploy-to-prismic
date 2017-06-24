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

@connect(state => ({
  repositories: state.repositories,
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
      <Container unpadded>
        <RepositoryList>
          <CreateRepository onClick={this.handleCreateRepositoryClick.bind(this)} />

          {Array.isArray(this.props.repositories) ? this.props.repositories.map(repository => (
            repository === 'fetching' ? (
              <span>FETCHING...</span>
            ) : repository === 'failed' ? (
              <span>FAILED</span>
            ) : (
              <Repository
                key={repository.name}
                name={repository.name}
                avatarUrl={repository.avatarUrl}
                avatarColor={repository.avatarColor}
                userCount={repository.userCount}
                isSelected={repository.isSelected}
                onSelect={() => this.props.selectRepository(repository.url)} />
            )
          )) : null}
        </RepositoryList>
        <Modal onClose={this.handleModalCloseClick.bind(this)} open={this.state.modalOpen}>
          <Input type="name" placeholder="Repository name" onChange={this.handleNameChange.bind(this)} />
          <Button type="submit" label="Create repository" onClick={this.handleNewRepositorySubmit.bind(this)} />
        </Modal>
      </Container>
    )
  }
}
