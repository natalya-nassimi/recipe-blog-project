import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'

// ? Component Imports
import Recipes from './components/Recipes/Recipes'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import RecipeEdit from './components/RecipeEdit/RecipeEdit'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
      <Routes>
        <Route path="/recipes" element={<Recipes/>}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails/>} ></Route>
        <Route path="/recipes/:recipeId/edit" element={<RecipeEdit/>} ></Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </main>
    </>
  )
}

export default App
