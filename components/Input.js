import React from 'react'
import classnames from 'classnames'

const Input = ({
  name,
  onChange,
  placeholder,
  type,
  disabled,
  invalid,
}) => (
  <label>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      autoComplete="off"
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={classnames({
        invalid,
      })}
    />
    <style jsx>{`
      label {
        display: inline-block;
      }

      input {
        outline: none;
        border: 1px solid #D4D9E2;
        border-radius: 3px;
        box-sizing: border-box;
        color: #6E7DA2;
        width: 100%;
        margin: auto;
        font-size: 15px;
        padding: 15px 13px 10px 13px;
        height: 55px;
      }

      input:focus {
        border: 1px solid #b1b9b7;
      }

      input.invalid {
        border: 1px solid #e47169;
      }
    `}</style>
  </label>
)

export default Input
