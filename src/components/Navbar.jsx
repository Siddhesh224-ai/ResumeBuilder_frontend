import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../app/features/authSlice'

const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const logoutUser = () => {
    navigate('/')
    dispatch(logout())
  }

  return (
    <div className='w-full top-0 z-50 sticky px-4 pt-4'>
      <nav className='glass-panel flex items-center justify-between max-w-7xl mx-auto px-6 py-3 rounded-2xl'>
        <Link to='/' className='flex items-center gap-2'>
          <img src="/logo.svg" alt="logo" className="h-8 w-auto brightness-200" />
          <span className='font-bold text-xl text-white tracking-wide'>Resume<span className='text-violet-400'>Builder</span></span>
        </Link>
        <div className='flex items-center gap-6 text-sm font-medium'>
          <p className='max-sm:hidden text-slate-200'>Hi, <span className='text-violet-300'>{user?.name}</span></p>
          <button onClick={logoutUser} className='glass-button-secondary px-6 py-2 rounded-lg text-sm'>Logout</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
