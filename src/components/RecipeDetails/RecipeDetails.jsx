import axios from "axios";
import { useEffect, useState } from "react";
import { recipeShow } from "../../services/recipes";
import { useParams } from "react-router";
const RecipeDetails =  ()=> {
    const [recipe, setRecipe] = useState({})
    const {recipeId} =  useParams();
    useEffect(()=>{
        const getRecipe =  async()=>{
            try {
                const {data}  = await recipeShow(recipeId);   
                setRecipe(data);        
            } catch (error) {
                
            }
        }
        getRecipe();
    }, [])
    return (
        <div>
            <h1>{recipe.name}</h1>
        </div>
    )
}


export default RecipeDetails;