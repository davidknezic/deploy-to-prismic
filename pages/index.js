import React, { Component } from 'react'
import Head from 'next/head'
import withRedux from 'next-redux-wrapper'
import { configureStore } from '../store'
import { setToken } from '../store/auth'
import { loadProfile } from '../store/profile'
import { loadRepositories } from '../store/repositories'
import { setUrl } from '../store/url'
import { loadSource } from '../store/source'
import Deploy from '../containers/Deploy'
import Usage from '../containers/Usage'
import Layout from '../components/Layout'

@withRedux(configureStore, state => ({
  auth: state.auth,
  url: state.url,
}), {
  loadProfile,
  loadRepositories,
  loadSource,
})
export default class Index extends Component {
  static async getInitialProps({ isServer, query, req, store }) {
    if (isServer) {
      store.dispatch(setToken(req.signedCookies.prismicToken))
      store.dispatch(setUrl(query.url))
    }
  }

  componentDidMount() {
    const ReactGA = require('react-ga')
    ReactGA.initialize('UA-101641457-1')

    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);

    if (this.props.url) {
      this.props.loadSource({ url: this.props.url })
    }
    if (this.props.auth) {
      this.props.loadProfile({ token: this.props.auth })
        .then(() => {
          this.props.loadRepositories({ token: this.props.auth })
        })
    }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>Deploy to Prismic</title>
        </Head>

        {this.props.url ? (
          <Deploy />
        ) : (
          <Usage />
        )}
      </Layout>
    )
  }
}
