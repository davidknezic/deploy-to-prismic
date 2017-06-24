import React from 'react'

const RepositoryList = ({
  children,
}) => (
  <div className="repositories">
    {children}
    <style jsx>{`
      .repositories {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        overflow-y: hidden;
      }

      .repositories::after {
        content: '​';
        display: inline-block;
        width: 15px;
        height: 100%;
        flex-shrink: 0;
      }

      .repositories > :global(*) {
        min-width: 300px;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: 15px;
      }
    `}</style>
  </div>
)

export default RepositoryList
