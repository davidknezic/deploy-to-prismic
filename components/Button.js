import React from 'react'
import classnames from 'classnames'

const Button = ({
  children,
  danger,
  onClick,
  small,
  type,
}) => (
  <label>
    <button
      type={type || 'button'}
      onClick={onClick}
      className={classnames({
        danger,
        small,
      })}
    >
      {children}
    </button>
    <style jsx>{`
      label {
        display: inline-block;
      }

      button {
        display: inline-block;
        width: 100%;
        color: #fff;
        text-decoration: none;
        padding: 0 40px;
        transition: .1s;
        border: none;
        background: #1DE9B6;
        outline: none;
        border-radius: 3px;
        font-weight: 700;
        font-size: 17px;
        line-height: 38px;
        height: 60px;
        box-sizing: border-box;
        user-select: none;
        white-space: pre;
      }

      button:hover {
        background-color: #16e1ae;
      }

      button.danger {
        color: #fff;
        background: #ea6344;
      }

      button.danger:hover {
        background-color: #ea6344;
        opacity: .85;
      }

      button.small {
        height: auto;
        padding: 8px 10px;
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
      }
    `}</style>
  </label>
)

export default Button
