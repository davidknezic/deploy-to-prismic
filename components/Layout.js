import React from 'react'
import Head from 'next/head'

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
    <style jsx global>{`
      body {
        padding: 0;
        margin: 0;
        color: #6E7DA2;
        background-color: #f9fbfd;
        font-family: "Hind Vadodara", "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
      }
    `}</style>
  </div>
)

export default Layout
