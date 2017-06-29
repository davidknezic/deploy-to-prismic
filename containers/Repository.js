import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRepository, selectRepository } from '../store/repositories'
import { clearProgress } from '../store/progress'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import Repository from '../components/Repository'
import RepositoryList from '../components/RepositoryList'
import CreateRepository from '../components/CreateRepository'
import Modal from '../components/Modal'
import Subtitle from '../components/Subtitle'
import NewRepositoryForm from '../components/NewRepositoryForm'

@connect(state => ({
  repositories: state.repositories.entities,
  selectedRepository: state.repositories.selected,
  token: state.auth,
}), {
  createRepository,
  selectRepository,
  clearProgress,
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
    this.setState({ name })
  }

  handleNewRepositorySubmit() {
    this.props.createRepository({
      token: this.props.token,
      name: this.state.name,
    })
    .then(() => this.setState({ name: '', modalOpen: false }))
  }

  handleCreateRepositoryClick() {
    this.setState({ modalOpen: true })
  }

  handleModalCloseClick() {
    this.setState({ modalOpen: false })
  }

  handleRepositorySelection(key) {
    this.props.selectRepository(key)
    this.props.clearProgress()
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
                    onSelect={this.handleRepositorySelection.bind(this, key)} />
                )
              )) : null}
            </RepositoryList>
            <Modal onClose={this.handleModalCloseClick.bind(this)} open={this.state.modalOpen}>
              <NewRepositoryForm
                onChange={this.handleNameChange.bind(this)}
                onClick={this.handleNewRepositorySubmit.bind(this)}
              />
            </Modal>
          </Container>
        ) : null}
      </div>
    )
  }
}
