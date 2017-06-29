import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../store/auth'
import { loadProfile, setProfile } from '../store/profile'
import { loadRepositories, clearRepositories } from '../store/repositories'
import { clearProgress } from '../store/progress'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import Subtitle from '../components/Subtitle'
import Profile from '../components/Profile'
import LoginForm from '../components/LoginForm'

@connect(state => ({
  profile: state.profile,
  auth: state.auth,
}), {
  login,
  logout,
  loadProfile,
  loadRepositories,
  setProfile,
  clearRepositories,
  clearProgress,
})
export default class ProfileContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleEmailChange(email) {
    this.setState({
      ...this.state,
      email,
    })
  }

  handlePasswordChange(password) {
    this.setState({
      ...this.state,
      password,
    })
  }

  handleLoginClick() {
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    })
    .then(() => this.props.loadProfile({ token: this.props.auth }))
    .then(() => this.props.loadRepositories({ token: this.props.auth }))

    const ReactGA = require('react-ga')
    ReactGA.event({
      category: 'Profile',
      action: 'Login',
    })
  }

  handleLogoutClick() {
    this.props.logout()
    this.props.setProfile(null)
    this.props.clearRepositories()
    this.props.clearProgress()

    const ReactGA = require('react-ga')
    ReactGA.event({
      category: 'Profile',
      action: 'Logout',
    })
  }

  render() {
    return (
      <Container>
        <Subtitle>1. Sign in to <a href="https://prismic.io">prismic.io</a></Subtitle>
        {this.props.profile === null || this.props.profile === 'failed' || this.props.profile === 'fetching' ? (
          <LoginForm onLogin={this.handleLoginClick.bind(this)}>
            <Input
              type="email"
              placeholder="Email address"
              onChange={this.handleEmailChange.bind(this)}
              disabled={this.props.profile === 'fetching'}
              invalid={this.props.profile === 'failed'}
            />
            <Input
              type="password"
              placeholder="******"
              onChange={this.handlePasswordChange.bind(this)}
              disabled={this.props.profile === 'fetching'}
              invalid={this.props.profile === 'failed'}
            />
            <Button
              type="submit"
            >
              Sign in
            </Button>
          </LoginForm>
        ) : (
          <Profile
            avatarUrl={this.props.profile.avatar}
            displayName={this.props.profile.displayName}
            firstName={this.props.profile.firstName}
            lastName={this.props.profile.lastName}
            onLogout={this.handleLogoutClick.bind(this)}
          />
        )}
      </Container>
    )
  }
}
