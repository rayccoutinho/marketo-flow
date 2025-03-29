// Adicione export para o componente
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined';
}

export function Button({ children, variant = 'contained' }: ButtonProps) {
  return (
    <button className={`btn ${variant}`}>
      {children}
    </button>
  );
}