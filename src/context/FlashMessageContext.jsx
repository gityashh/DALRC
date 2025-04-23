import { createContext, useState, useEffect } from "react"

export const FlashMessageContext = createContext()

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null)

  // Auto-dismiss flash messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const showMessage = (text, type = "info") => {
    setMessage({ text, type })
  }

  const clearMessage = () => {
    setMessage(null)
  }

  return (
    <FlashMessageContext.Provider
      value={{
        message,
        showMessage,
        clearMessage,
      }}
    >
      {children}
    </FlashMessageContext.Provider>
  )
}
