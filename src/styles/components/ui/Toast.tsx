import { useEffect } from 'react'
import styled from 'styled-components'

const ToastContainer = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: ${({ type }) => (type === 'success' ? '#38a169' : '#e53e3e')};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-weight: bold;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  duration?: number // tempo em milissegundos
  onClose: () => void
}

export const Toast = ({ message, type = 'success', duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return <ToastContainer type={type}>{message}</ToastContainer>
}
