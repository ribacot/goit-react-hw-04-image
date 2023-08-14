import { useEffect,useCallback } from 'react';
import css from './Modal.module.css';

export default function Modal({ children, onClick }) {

const onClickmemo = useCallback(
  () => {
    onClick()
  }
  ,[onClick]
)

  const hendleBackDrop = e => {
    if (e.target === e.currentTarget) onClick();
  };

  useEffect(() => {
    const hendleModal = e => {
      if (e.code === 'Escape') {
        onClickmemo();
      }
    };
  
    window.addEventListener('keydown', hendleModal);

    return () => {
      window.removeEventListener('keydown', hendleModal);
    };
  }, [onClickmemo]);

  return (
    <div className={css.overlay} onClick={hendleBackDrop}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
