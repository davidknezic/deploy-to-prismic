import React from 'react'

const Title = ({
  children,
}) => (
  <h1>
    {children}
    <style jsx>{`
      h1 {
        margin-top: 30px;
        margin-bottom: 0;

        font-size: 2.125rem;
        letter-spacing: 1px;
        font-weight: 300;
        color: #484A7A;
        text-rendering: optimizeLegibility;
        line-height: 1.4;
      }

      h1:first-child {
        margin-top: 0;
      }

      h1 :global(a) {
        text-decoration: underline;
        transition: color 0.3s ease;
        color: #707B93;
      }

      h1 :global(a:hover) {
        color: #606a7f;
      }
    `}</style>
  </h1>
)

export default Title
