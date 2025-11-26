import { useEffect, useState } from "react";
import { recipeShow } from "../../services/recipes";
import { useNavigate, useParams } from "react-router";
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
        loading ? <p>Loading ...</p> :
            <>
                <section className="titleCard">
                    <h1>{recipe.name}</h1>
                    <p>{recipe.author?.username}</p>
                    <p>{recipe?.createdAt.split("T")[0]}</p>
                    {recipe.preparationTime?<p>{recipe.preparationTime} hours</p>:<p>No duration set</p>}
                </section>
                <section >
                    {recipe.ingredients.map((ingredient, index)=>{
                        return(
                        <div key={index}>
                            <p>{ingredient.measurement +` ${ingredient.measurement>1?ingredient.unit+`s`: ingredient.unit}` + ` of ${ingredient.name}`} </p>
                        </div>
                        )
                    })}
                </section>
                <section className="instrutions">
                    <h2>Instructions</h2>
                    <ol>
                        {recipe.instructions.map((instruction, index)=>{
                            return <li key={index}>{instruction}</li>
                        })}
                    </ol>
                </section>
            </>
    )
}


export default RecipeDetails;