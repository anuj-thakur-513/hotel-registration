import { createContext, useState } from 'react'

export const alertContext = createContext()

const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }
  return (
    <alertContext.Provider value={{ alert, showAlert }}>
      {children}
    </alertContext.Provider>
  )
}

export default AlertContextProvider
