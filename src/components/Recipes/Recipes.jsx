import RecipeCard from "./RecipeCard/RecipeCard";
import { recipeIndex } from "../../services/recipes";
import { useEffect, useState } from "react";
import './Recipes.css'
import { UserProvider } from "../../contexts/UserContext";

const Recipes = ({ filterByUser, userId }) => {

    // ? Hooks

    const [recipes, setRecipe] = useState([]);
    const [errorData, setErrorData] = useState({})
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const { data } = await recipeIndex();
                
                const filteredRecipes = filterByUser && userId
                ? data.filter(recipe => recipe.author?._id === userId)
                : data;

                setRecipe(filteredRecipes);
            } catch (error) {
                console.log(error)
                setErrorData(error.response.data)
            }
        }
        getRecipes();
    }, [filterByUser, userId]);

    return (
        <>
        {errorData.message?
            <p className="error-message">{errorData.message}</p>
            :<section className="recipes-container">
                {recipes.length > 0 ? recipes.map(recipe => {
                    return (
                        <RecipeCard key={recipe._id} recipe={recipe} />

                    )
                }) : <p>No Recipes Found</p>}
            </section>
        }
        </>
    )
}
export default Recipes