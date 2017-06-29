import React from 'react'

const ErrorMessage = ({
  children,
}) => (
  <div className="error-message">
    {children}
    <style jsx>{`
      .error-message {
        background-color: #f8eceb;
        color: #e47169;
        padding: 25px 15px 28px 15px;
        margin-top: 10px;
      }

      .error-message::before {
        font-size: 18px;
        position: relative;
        top: 4px;
        font-family: 'Material Icons';
        content: 'cancel';
        margin-right: 5px;
      }
    `}</style>
  </div>
)

export default ErrorMessage
