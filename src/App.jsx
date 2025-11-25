import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

// ? Component Imports
import Recipes from './components/Recipes/Recipes'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Routes>
        <Route path="/recipes" element={<Recipes/>}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails/>} ></Route>
      </Routes>
    </main>
    </>
  )
}

export default App
