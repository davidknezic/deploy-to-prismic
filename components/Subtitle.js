import React from 'react'

const Subtitle = ({
  children,
}) => (
  <h2>
    {children}
    <style jsx>{`
      h2 {
        margin-top: 60px;
        margin-bottom: 20px;

        font-size: 1.75rem;
        letter-spacing: 1px;
        font-weight: 300;
        color: #484A7A;
        text-rendering: optimizeLegibility;
        line-height: 1.3;
      }
    `}</style>
  </h2>
)

export default Subtitle
