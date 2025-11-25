import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar/Navbar'

// ? Component Imports
import Recipes from './components/Recipes/Recipes'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <main>
      <Routes>
        <Route path="/recipes" element={<Recipes/>}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails/>} ></Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </main>
    </>
  )
}

export default App
