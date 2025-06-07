// FormGrid.ts
import styled from 'styled-components'

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  div {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`
