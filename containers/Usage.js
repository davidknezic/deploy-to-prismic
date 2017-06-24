import React from 'react'
import Container from '../components/Container'
import Title from '../components/Title'

const Usage = ({
}) => (
  <div role="main" className="usage">
    <Container>
      <Title>One-click deploy to <a href="https://prismic.io">prismic.io</a></Title>
      <p><img src="/static/button.svg" /></p>
      <p>Save your custom types in your source repository and deploy them to your <a href="https://prismic.io">prismic.io</a> projects with just one-click.</p>
      <p>To add the one-click deploy button to your open source project, include the button in your <code>README.md</code>.</p>
      <pre>[![<span className="blue link">Deploy to Prismic</span>](<span className="blue">https://deployweb.site/static/button.svg</span>)](<span className="blue">https://deployweb.site/?url=<strong className="green">https://github.com/davidknezic/deploy-to-prismic/tree/master/example</strong></span>)</pre>
      <p>Notice the <code>url</code> param? It points to the folder in your source repository which contains the deployment information.</p>
      <p>Check out the example under under<br /><a href="https://github.com/davidknezic/deploy-to-prismic/tree/master/example">https://github.com/davidknezic/deploy-to-prismic/tree/master/example</a></p>
    </Container>
    <style jsx>{`
      .usage {
        padding: 60px 0;
      }

      p {
        margin-top: 30px;
        margin-bottom: 0;

        letter-spacing: 0.4px;
        line-height: 1.8;
        text-rendering: optimizeLegibility;
      }

      pre {
        margin-top: 30px;
        margin-bottom: 0;

        background-color: #f7f7f7;
        white-space: pre-wrap;
        line-height: 1.8;
        font-size: 1.2rem;
      }

      pre .link {
        text-decoration: underline;
      }

      pre .blue {
        color: #6970E2;
      }

      pre .green {
        color: #15d8a7;
      }

      code {
        background: rgba(0,0,0,0.04);
        padding: 0.2em;
        font-size: 95%;
      }
    `}</style>
  </div>
)

export default Usage
