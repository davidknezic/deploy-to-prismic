import React from 'react'
import Head from 'next/head'
import Container from './Container'

const Layout = ({
  children,
}) => (
  <div className="root">
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </Head>
    {children}
    <footer>
      <Container>
        <span><a href="https://github.com/davidknezic/deploy-to-prismic">source code</a></span>
        <span> | </span>
        <span>made by <a href="https://github.com/davidknezic">@davidknezic</a></span>
      </Container>
    </footer>
    <style jsx>{`
      footer {
        padding: 40px 0;
      }
    `}</style>
    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        color: #6E7DA2;
        background-color: #f9fbfd;
        font-family: "Hind Vadodara", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
      }

      a {
        text-decoration: underline;
        transition: color 0.3s ease;
        color: #707B93;
      }

      a:hover {
        color: #606a7f;
      }
    `}</style>
  </div>
)

export default Layout
