import RecipeCard from "./RecipeCard/RecipeCard";
import { recipeIndex } from "../../services/recipes";
import { useEffect, useState } from "react";
const Recipes = ()=>{
    const [recipes, setRecipe] = useState([]);
    useEffect(()=>{
        const getRecipes = async()=>{
            try {
                const response = await recipeIndex();
                console.log(response)
            } catch (error) {
                
            }
        }
        getRecipes();
    })
    return(
        <>
            <h1>Recipes</h1>
            <section>
                {/* {recipes.map(recipe=>{
                    return(
                        <RecipeCard recipe={recipe}  />
                    )
                })} */}
            </section>
        </>
    )
}
export default Recipes