import styled from 'styled-components'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logout } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Bar = styled.div`
  height: 60px;
  background: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: relative;
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
`

const Menu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`

const MenuItem = styled.button`
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`

export const Topbar = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || '?'

  return (
    <Bar>
      <Avatar onClick={() => setShowMenu(!showMenu)}>
        {initial}
      </Avatar>
      {showMenu && (
        <Menu>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}
    </Bar>
  )
}
