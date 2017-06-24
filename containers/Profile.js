import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login, logout } from '../store/auth'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'

@connect(state => ({
  profile: state.profile,
}), {
  login,
  logout,
})
export default class Profile extends Component {
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
    return this.props.profile === null ? (
      <Container>
        <Input type="email" placeholder="Email address" onChange={this.handleEmailChange.bind(this)} />
        <Input type="password" placeholder="******" onChange={this.handlePasswordChange.bind(this)} />
        <Button type="submit" label="Sign in" onClick={this.handleLoginClick.bind(this)} />
      </Container>
    ) : (
      <div>
        <img src={this.props.profile.avatar} alt={`Avatar of ${this.props.profile.displayName}`} />
        <span>You're {this.props.profile.displayName}</span>
        <button type="button" onClick={() => this.props.logout()}>Logout</button>
      </div>
    )
  }
}
