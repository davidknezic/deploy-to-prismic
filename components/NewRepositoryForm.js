import React from 'react'
import Head from 'next/head'
import classnames from 'classnames'

const NewRepositoryForm = ({
  onChange,
  onClick,
}) => (
  <form onSubmit={(event) => {
    event.preventDefault()
    onClick()
  }}>
    <input
      type="text"
      autoComplete="off"
      placeholder="my-new-repository"
      onChange={(event) => onChange(event.target.value)}
    />
    <button type="submit">Create</button>
    <style jsx>{`
      form {
        width: 100%;
        height: 90px;
        display: flex;
        background: #15d8a7;
      }

      input {
        border: none;
        outline: none;
        flex: 1;
        background: none;
        color: white;
        padding: 0 70px;
        margin: 0;
        font-size: 16px;
        color: white;
      }

      input::placeholder {
        color: #127F7C;
      }

      button {
        width: 90px;
        background: #25D1A4;
        display: block;
        outline: none;
        padding: 0;
        border: 0;
        border-radius: 0;
        line-height: 1;
        margin: 0;
        font-size: 16px;
        color: white;
      }
    `}</style>
  </form>
)

export default NewRepositoryForm
