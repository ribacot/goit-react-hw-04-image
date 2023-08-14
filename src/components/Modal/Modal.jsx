import { useState, useEffect } from 'react';
import css from './Modal.module.css';

export default function Modal({ children, onClick }) {
  useEffect(() => {
    window.addEventListener('keydown', hendleModal);

    return () => {
      window.removeEventListener('keydown', hendleModal);
    };
  }, []);

  const hendleModal = e => {
    if (e.code === 'Escape') {
      console.log('esc');

      onClick();
    }
  };

  return (
    <div className={css.overlay} onClick={onClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
