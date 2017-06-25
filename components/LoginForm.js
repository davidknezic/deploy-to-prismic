import React from 'react'

const LoginForm = ({
  children,
  onLogin,
}) => (
  <form
    onSubmit={(event) => {
      onLogin()
      event.preventDefault()
    }}
  >
    {children}
    <style jsx>{`
      form {
        max-width: 400px;
        width: 100%;
      }

      form > :global(*) {
        width: 100%;
        margin-top: 5px;
      }
    `}</style>
  </form>
)

export default LoginForm
