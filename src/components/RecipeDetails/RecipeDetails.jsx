import { useEffect, useState } from "react";
import { recipeShow } from "../../services/recipes";
import { useParams } from "react-router";
import './RecipeDetails.css'

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(true);
    const { recipeId } = useParams();
    useEffect(() => {
        const getRecipe = async () => {
            try {
                const { data } = await recipeShow(recipeId);
                setLoading(false)
                setRecipe(data);
            } catch (error) {

            }
        }
        getRecipe();
    }, [])

    return (
        loading ? <p className="loading">Loading ...</p> :
            <>
                <div className='recipe-details-container'>
                    <section className="recipe-header-card">
                        <h1>{recipe.name}</h1>
                        <p className='author'> {recipe.author?.username}</p>
                        <p className='date'> {recipe?.createdAt.split("T")[0]}</p>
                        <p className='prep-time'> {recipe.preparationTime}</p>
                    </section>

                    <div className='details-grid'>
                        <section className='ingredients'>
                            <h2>Ingredients</h2>
                            {recipe.ingredients.map(ingredient => {
                                return (
                                    <div>
                                        <p>{ingredient.measurement + ` ${ingredient.measurement > 1 ? ingredient.unit + `s` : ingredient.unit}` + ` of ${ingredient.name}`} </p>
                                    </div>
                                )
                            })}
                        </section>

                        <section className="instrutions-card">
                            <h2>Instructions</h2>
                            <ol>
                                {recipe.instructions.map((instruction, index) => {
                                    return <li key={index}>{instruction}</li>
                                })}
                            </ol>
                        </section>
                    </div>
                </div>
            </>
    )
}


export default RecipeDetails;