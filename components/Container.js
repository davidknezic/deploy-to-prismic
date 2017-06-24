import React from 'react'
import classnames from 'classnames'

const Container = ({
  children,
  unpadded,
}) => (
  <div className={classnames('container', {
    unpadded,
  })}>
    {children}
    <style jsx>{`
      .container {
        max-width: 768px;
        margin: 0 auto;
        padding: 0 15px;
      }

      .container.unpadded {
        max-width: 798px;
        padding: 0;
      }
    `}</style>
  </div>
)

export default Container
