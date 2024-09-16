import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Simple from './Simple'
import HookForm from './HookForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Simple/> */}
      <HookForm/>
    </>
  )
}

export default App
