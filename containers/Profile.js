import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../store/auth'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import Subtitle from '../components/Subtitle'
import Profile from '../components/Profile'
import LoginForm from '../components/LoginForm'

@connect(state => ({
  profile: state.profile,
}), {
  login,
  logout,
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
  }

  render() {
    return (
      <Container>
        <Subtitle>1. Sign in to <a href="https://prismic.io">prismic.io</a></Subtitle>
        {this.props.profile === null ? (
          <LoginForm onLogin={this.handleLoginClick.bind(this)}>
            <Input type="email" placeholder="Email address" onChange={this.handleEmailChange.bind(this)} />
            <Input type="password" placeholder="******" onChange={this.handlePasswordChange.bind(this)} />
            <Button type="submit">Sign in</Button>
          </LoginForm>
        ) : (
          <Profile
            avatarUrl={this.props.profile.avatar}
            displayName={this.props.profile.displayName}
            firstName={this.props.profile.firstName}
            lastName={this.props.profile.lastName}
            onLogout={this.props.logout}
          />
        )}
      </Container>
    )
  }
}
