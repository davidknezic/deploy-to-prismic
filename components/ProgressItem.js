import React from 'react'
import classnames from 'classnames'

const ProgressItem = ({
  children,
  state,
}) => (
  <div className={classnames('progress-item', {
    pending: state === 'deploying',
    done: state === 'success',
    error: state === 'failed',
  })}>
    {children}
    <style jsx>{`
      .progress-item {
        min-height: 16px;
        border-bottom: 1px solid #d7dde9;
        line-height: 38px;
      }

      .progress-item:first-child {
        border-top: 1px solid #d7dde9;
      }

      .progress-item::before {
        font-size: 18px;
        margin-right: 5px;
      }

      .progress-item.pending::before {
        content: '';
        display: inline-block;
        width: 18px;
        height: 18px;
        background-image: url('/static/loader-svg-anim.svg');
        background-size: 18px;
        transform: translateY(4px);
      }

      .progress-item.done::before {
        color: #3cc782;
        font-family: 'Material Icons';
        content: 'check_circle';
        vertical-align: bottom;
      }

      .progress-item.error::before {
        color: #e47169;
        font-family: 'Material Icons';
        content: 'cancel';
        vertical-align: bottom;
      }
    `}</style>
  </div>
)

export default ProgressItem
