import React from 'react'

const CreateRepository = ({
  onClick,
}) => (
  <div className="create">
    <button id="create" href="new-repository/" onClick={onClick}>
      <span>Create a new blank repository</span>
    </button>
    <style jsx>{`
      .create {
        background: #fff;
        height: 195px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 2px;
        background-color: #fff;
        color: #3e4676;
        box-shadow: none;
      }

      button {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 16px;
        color: #a7b0c7;
        text-decoration: none;
        box-sizing: border-box;
        line-height: 40px;
        border: none;
        cursor: pointer;
        background: #f9fbfd;
        border: 1px dashed #d7dde9;
        transition: color .2s ease-in-out;
        outline: none;
      }

      .create:hover button {
        color: #3e4676;
        background: #f5f8fa;
      }

      span {
        position: relative;
        max-width: 170px;
        display: block;
        margin: 0 auto;
        line-height: 26px;
        font-weight: 500;
      }

      span::before {
        font-family: 'Material Icons';
        content: 'add_circle';
        color: #bbc4d3;
        display: block;
        font-size: 48px;
        margin-bottom: 15px;
        transition: transform .2s ease-in-out,color .2s ease-in-out;
      }

      .create:hover span::before {
        transform: rotate(90deg);
        color: #3cc782;
      }
    `}</style>
  </div>
)

export default CreateRepository
