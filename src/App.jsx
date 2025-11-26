import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar/Navbar'

// ? Component Imports
import Recipes from './components/Recipes/Recipes'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import RecipeEdit from './components/RecipeEdit/RecipeEdit'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import RecipeCreate from './components/RecipeCreate/RecipeCreate'
import MyRecipes from './components/MyRecipes/MyRecipes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <main>
      <Routes>
        <Route path="/recipes" element={<Recipes/>}></Route>
        <Route path="/recipes/:recipeId" element={<RecipeDetails/>} ></Route>
        <Route path="/recipes/:recipeId/edit" element={<RecipeEdit/>} ></Route>
        <Route path="/recipes/new" element={<RecipeCreate/>} ></Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/recipes/my-recipes" element={<MyRecipes/>}></Route>
      </Routes>
    </main>
    </>
  )
}

export default App
