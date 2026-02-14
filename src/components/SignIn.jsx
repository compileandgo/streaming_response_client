import { GalleryVerticalEnd } from "lucide-react"
import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const SignIn = () => {
  const { user, loading, signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password);
    
    await signIn(email, password);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">sign in</button>
    </form>
  )
}

export default SignIn
