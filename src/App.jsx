import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Recipes from './components/Recipes/Recipes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Routes>
        <Route path="/recipes" element={<Recipes/>}></Route>
      </Routes>
    </main>
    </>
  )
}

export default App
