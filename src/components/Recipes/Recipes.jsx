import RecipeCard from "./RecipeCard/RecipeCard";
import { recipeIndex } from "../../services/recipes";
import { useEffect, useState } from "react";
import './Recipes.css'

const Recipes = () => {

    // ? Hooks

    const [recipes, setRecipe] = useState([]);
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const { data } = await recipeIndex();
                setRecipe(data);
            } catch (error) {

            }
        }
        getRecipes();
    }, []);

    return (
        <>
            <section className="recipes-container">
                {recipes.length > 0 ? recipes.map(recipe => {
                    return (
                        <RecipeCard key={recipe._id} recipe={recipe} />

                    )
                }) : <p>No Recipes Found</p>}
            </section>
        </>
    )
}
export default Recipes