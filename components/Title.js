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
    `}</style>
  </h1>
)

export default Title
