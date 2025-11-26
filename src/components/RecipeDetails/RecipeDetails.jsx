import { useEffect, useState } from "react";
import { recipeShow } from "../../services/recipes";
import { useNavigate, useParams } from "react-router";
import { useParams } from "react-router";
import './RecipeDetails.css'

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({})
    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState({})
    const navigate = useNavigate()
    const { recipeId } = useParams();
    useEffect(() => {
        const getRecipe = async () => {
            try {
                const { data } = await recipeShow(recipeId);
                setLoading(false)
                setRecipe(data);
            } catch (error) {
                console.log(error)
                if (error.response.status === 500) {
                setErrorData({ message: 'Something went wrong. Please try again' })
                } else if (error.response.status === 404) {
                navigate('/page-not-found')
                } else {
                setErrorData(error.response.data)
                }                
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
                        <p className='prep-time'> Preparation time: {recipe.preparationTime} hours </p>
                    </section>

                    <div className='details-grid'>
                        <section className='ingredients-card'>
                            <h2>Ingredients</h2>
                            {recipe.ingredients.map(ingredient => {
                                return (
                                    <div>
                                        <p>{ingredient.measurement + ` ${ingredient.measurement > 1 ? ingredient.unit + `s` : ingredient.unit}` + ` of ${ingredient.name}`} </p>
                                    </div>
                                )
                            })}
                        </section>

                        <section className="instructions-card">
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