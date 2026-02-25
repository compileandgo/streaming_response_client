import React, { useState } from 'react'
import useChat from '../hooks/useChat'
import ReactMarkDown from "react-markdown"
import remarkGfm from "remark-gfm"

const TextGenerator = ({ backendUrl }) => {
    const [input, setInput] = useState("")
    const {isLoading, generateStream, streamContent, error} = useChat("http://localhost:5000/api/stream");

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.trim()) return;
        generateStream({message: input})
        setInput("")
    }

  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Ask something...' required />
            <button type='submit'>{isLoading ? "loading" : "send"}</button>
        </form>

        <ReactMarkDown remarkPlugins={[remarkGfm]} >{streamContent}</ReactMarkDown>
    </div>
  )
}

export default TextGenerator
