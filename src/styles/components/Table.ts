import styled from 'styled-components'

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;

  tbody tr:hover {
    background-color: #f0f0f0;
  }
`

export const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #edf2f7;
  color: #2d3748;
  font-weight: 600;
`

export const Td = styled.td`
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
`
