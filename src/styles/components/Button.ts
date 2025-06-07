import styled from 'styled-components'

export const PrimaryButton = styled.button`
  width: fit-content;
  padding: 0.5rem 1rem;
  background-color: #38a169;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2f855a;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`

export const SecondaryButton = styled(PrimaryButton)`
  background-color: #ccc;
  color: #333;

  &:hover {
    background-color: #bbb;
  }
`

export const DangerButton = styled(PrimaryButton)`
  background-color: #e53e3e;

  &:hover {
    background-color: #c53030;
  }
`
