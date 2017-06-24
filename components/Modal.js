import React from 'react'
import Head from 'next/head'
import classnames from 'classnames'

const Modal = ({
  children,
  open,
  onClose,
}) => (
  <div className={classnames('overlay', { 'open': open })}>
    <div className="backdrop" onClick={onClose}></div>
    <div className="modal">
      {children}
    </div>
    <style jsx>{`
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(1.2);
        transition: all 0.3s ease;
        pointer-events: none;
      }

      .overlay.open {
        opacity: 1;
        transform: scale(1);
        pointer-events: all;
      }

      .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
      }

      .modal {
        z-index: 1;
      }
    `}</style>
  </div>
)

export default Modal
