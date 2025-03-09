import React from 'react'
import LoginForm from './LoginForm'

const LoginContainer = () => {
  return (
    <section className='w-full h-full bg-white flex flex-col px-5 pb-5 pt-[72px]'>
      <h1 className='text-header text-center py-10'>내 타임캡슐 확인하기</h1>
      <LoginForm />
    </section>
  )
}

export default LoginContainer