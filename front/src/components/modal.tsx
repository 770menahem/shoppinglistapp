import React, { useEffect } from 'react';
import '../style/modal.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  const handleClick = (event: any) => {
    event.stopPropagation();
    const modal = document.querySelector(`.modalContainer`);

    if (modal && !modal.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div className={'modalBackground' + (isOpen ? '' : ' ' + 'hidden')} onClick={handleClick}>
      <div className={'modalContainer'}>
        <button
          className={'titleCloseBtn'}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
