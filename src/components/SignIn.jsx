import { GalleryVerticalEnd } from "lucide-react"
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import LoginForm from './signin-form.jsx'

const SignIn = () => {
  return (
    <div className="dark bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm /> 
      </div>
    </div>
  )
}

export default SignIn
