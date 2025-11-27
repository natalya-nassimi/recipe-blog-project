import { useContext, useEffect, useState } from "react";
import { recipeShow } from "../../services/recipes";
import { useNavigate, useParams } from "react-router";
import DeleteRecipe from "../DeleteRecipe/DeleteRecipe";
import { UserContext } from "../../contexts/UserContext";
import { toast, ToastContainer } from "react-toastify";
import './RecipeDetails.css'
import CommentCreate from "../CommentCreate/CommentCreate";
import CommentFeed from "../CommentFeed/CommentFeed";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import defaultImage from '../../assets/default-image.png'

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        preparationTime: "",
        image: "",
        instructions: [],
        comments: []
    })
    const [loading, setLoading] = useState(true);
    const [errorData, setErrorData] = useState({})
    const navigate = useNavigate()
    const { recipeId } = useParams();
    const { user } = useContext(UserContext)
    useEffect(() => {
        const getRecipe = async () => {
            try {
                const { data } = await recipeShow(recipeId);
                setLoading(false)
                setRecipe(data);
            } catch (error) {
                if (error.response.status === 500) {
                    setErrorData({ message: 'Something went wrong. Please try again' })
                    toast("Something went wrong. Please try again later");
                } else if (error.response.status === 404) {
                    navigate('/page-not-found')
                } else {
                    setErrorData(error.response.data);
                    const {data} =  error.response.data;
                    Object.keys(data).map(parameter =>{
                        toast(data[parameter])
                    })
                }
            } finally {
                setLoading(false)
            }
        }
        getRecipe();
    }, [recipeId, navigate])


    return (
        <>
        {errorData.message ? <p className="error-message">{errorData.message}</p>:(loading ? <LoadingIcon></LoadingIcon> :
            <>
                <div className="recipe-image-container">
                    <img className='recipe-image' src={recipe.image || defaultImage} alt={recipe.name} />
                </div>
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
                            {recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <div key={index} >
                                        <p> {ingredient.measurement + ` ${ingredient.measurement > 1 ? ingredient.unit + `s` : ingredient.unit}` + ` of ${ingredient.name}`} </p>
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
                        
                        {user && user._id === recipe.author._id && (
                            <section>
                                <div className='user-actions'>
                                    <button className='edit-btn' onClick={() => navigate(`/recipes/${recipeId}/edit`)}>
                                        Edit Recipe
                                    </button>
                                    <DeleteRecipe recipeId={recipeId} />
                                </div>
                            </section>
                        )}

                        <section className='comments-section'>
                            <h1>Comments</h1>
                        < div className='comment-box'>
                            <CommentCreate recipe={recipe} recipeId={recipeId}setRecipe={setRecipe} user={user}></CommentCreate>
                        </div>
                        <div className='comment-feed'>
                            <CommentFeed recipe={recipe}></CommentFeed>
                        </div>
                        </section>
                    </div>
                </div>
                
            </>
        )
    } 
    <ToastContainer/>
    </>
    )
}


export default RecipeDetails;