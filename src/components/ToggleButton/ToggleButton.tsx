import React from 'react';
import styles from './ToggleButton.module.css';

type ToggleButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export default function ToggleButton({ onClick, children }: ToggleButtonProps) {
  return <button className={styles.button} onClick={onClick}>
    {children}
  </button>
}
