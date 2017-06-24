import React from 'react'

const Input = ({
  label,
  onClick,
  type,
}) => (
  <label>
    <style jsx>{`
      input {
        display: inline-block;
        color: #fff;
        text-decoration: none;
        padding: 20px 40px;
        cursor: pointer;
        transition: .1s;
        border: none;
        background: #1DE9B6;
        outline: none;
        border-radius: 3px;
        padding: 13px;
        font-weight: 700;
        font-size: 17px;
        line-height: 38px;
        height: 60px;
        width: 100%;
        box-sizing: border-box;
      }

      input:hover {
        background-color: #16e1ae;
      }
    `}</style>
    <input type={type} value={label} onClick={() => onClick()} />
  </label>
)

export default Input
