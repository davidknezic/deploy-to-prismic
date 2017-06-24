import React from 'react'
import classnames from 'classnames'

const Repository = ({
  avatarColor,
  avatarUrl,
  isSelected,
  name,
  onSelect,
  userCount,
}) => (
  <div
    className={classnames('repository', {
      active: isSelected,
    })}
    onClick={onSelect}
  >
    <div className="header">
      <span className="repository-avatar">
        <span
          className="repository-avatar__img default"
          style={{
            backgroundColor: avatarColor,
            backgroundImage: 'url("https://prismic.io/...6c03763/images/logoHeader.svg")',
          }}
        ></span>
        {avatarUrl ? (
          <span
            className="repository-avatar__img uploaded"
            style={{ backgroundImage: `url("${avatarUrl}")` }}
          ></span>
        ) : null}
      </span>
      {userCount ? (
        <div className="user">{userCount === 1 ? '1 user' : `${userCount} users`}</div>
      ) : null}
    </div>

    <section className="body">
      <h3>{name}</h3>
    </section>

    <style jsx>{`
      .repository {
        display: inline-block;
        background: #fff;
        height: 195px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        box-sizing: border-box;
        border-radius: 2px;
        box-shadow: 0 2px 4px 0 #e3e9f3;
        transition: all .2s ease-in-out,transform .1s ease-in-out;
        background-color: #fff;
        color: #3e4676;
        border: 1px solid transparent;
      }

      .repository:hover {
        box-shadow: 0 2px 4px 0 #dae1ec, 0 4px 14px 0 #e3e9f3;
        transform: scale(1.02);
      }

      .repository.active {
        border: 1px solid #3cc782;
      }

      .header {
        padding: 0;
        height: 60px;
        border-bottom: 1px solid #eef1f6;
        line-height: 40px;
        position: relative;
      }

      .repository-avatar {
        width: 60px;
        height: 60px;
        display: block;
        position: absolute;
        left: 30px;
        top: 30px;
        overflow: hidden;
        position: relative;
      }

      .repository-avatar__img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 50%;
      }

      .repository-avatar__img.uploaded {
        background-size: cover;
      }

      .user {
        color: #6e7da2;
        font-size: 12px;
        line-height: 14px;
        padding: 0;
        position: absolute;
        bottom: 10px;
        right: 20px;
      }

      .user::before {
        font-family: 'Material Icons';
        content: 'people';
        color: #a7b0c7;
        font-size: 16px;
        position: relative;
        top: 4px;
        margin-right: 5px;
      }

      .body {
        padding-left: 30px;
        padding-top: 60px;
      }
    `}</style>
  </div>
)

export default Repository
