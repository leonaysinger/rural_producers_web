import { useState, type InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { login, logout } from '../../features/user/userSlice'
import { loginRequest } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
import isPropValid from '@emotion/is-prop-valid'

interface StyledInputProps extends InputHTMLAttributes<HTMLInputElement> {
    $hasError?: boolean
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`

const Input = styled('input').withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== '$hasError',
}) <StyledInputProps>`
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    font-size: 16px;
    border-radius: 6px;
    border: 2px solid ${({ $hasError }) => ($hasError ? 'red' : '#ccc')};
    &:focus {
      border-color: #667eea;
      outline: none;
    }
  `
const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #667eea;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #5a67d8;
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`

const Error = styled.p`
  color: red;
  font-size: 14px;
  margin: -0.5rem 0 1rem 0;
`

export const Login = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')

    const validate = () => {
        const errs: typeof errors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}(?:\.[a-z]{2,})?$/i
        if (!emailRegex.test(email)) {
            errs.email = 'Email inválido'
        }
        if (password.length < 6) {
            errs.password = 'Senha deve ter no mínimo 6 caracteres'
        }
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleLogin = async () => {
        if (!validate()) return
        setLoading(true)
        setApiError('')
        try {
            const result = await loginRequest(email, password)
            dispatch(login(result.user_name))
            navigate('/home', { replace: true })
        } catch (err: any) {
            setApiError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Card>
                {user.loggedIn ? (
                    <>
                        <Title>Bem-vindo, {user.name}!</Title>
                        <Button onClick={() => dispatch(logout())}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Title>Login</Title>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            $hasError={!!errors.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <Error>{errors.email}</Error>}

                        <Input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            $hasError={!!errors.password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <Error>{errors.password}</Error>}

                        <Button onClick={handleLogin} disabled={loading}>
                            {loading ? 'Entrando...' : 'Entrar'}
                        </Button>

                        <p style={{ marginTop: '2rem' }}>{apiError && <Error>{apiError}</Error>}</p>
                    </>
                )}
            </Card>
        </Container>
    )
}
