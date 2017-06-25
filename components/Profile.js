import React from 'react'
import Button from './Button'

const Profile = ({
  avatarUrl,
  displayName,
  firstName,
  lastName,
  onLogout,
}) => (
  <div className="profile">
    <div className="header">
      <span className="avatar">
        <img className="avatar-img" src={avatarUrl} alt={`Avatar of ${displayName}`} />
      </span>
      <div className="logout">
        <Button small danger onClick={onLogout}>Logout</Button>
      </div>
    </div>
    <section className="body">
      <h3>{displayName}</h3>
    </section>
    <style jsx>{`
      .profile {
        display: inline-block;
        background: #fff;
        min-width: 260px;
        height: 195px;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 2px;
        box-shadow: 0 2px 4px 0 #e3e9f3;
        transition: all .2s ease-in-out,transform .1s ease-in-out;
        background-color: #fff;
        color: #3e4676;
        border: 1px solid transparent;
      }

      .header {
        padding: 0;
        height: 60px;
        border-bottom: 1px solid #eef1f6;
        line-height: 40px;
        position: relative;
      }

      .avatar {
        width: 60px;
        height: 60px;
        display: block;
        position: absolute;
        left: 30px;
        top: 30px;
        overflow: hidden;
        position: relative;
      }

      .avatar-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .logout {
        position: absolute;
        bottom: 10px;
        right: 20px;
        padding: 0;
      }

      .body {
        padding-left: 30px;
        padding-top: 60px;
      }

      h3 {
        margin: 0;
      }
    `}</style>
  </div>
)

export default Profile
