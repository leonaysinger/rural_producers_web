import styled from "styled-components"

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 200px;
`

export const CardTitle = styled.p`
  font-weight: bold;
  color: #4a5568;
`

export const CardValue = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-top: 0.5rem;
`
export const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f5f7fa;
`

export const Summary = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`