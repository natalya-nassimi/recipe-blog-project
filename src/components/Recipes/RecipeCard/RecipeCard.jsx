import { useNavigate } from "react-router";
const RecipeCard = ({recipe})=>{

    // ? Hooks
    const navigate = useNavigate();

    // ? handler functions

    const handleClick = (event) => {
        navigate(`/recipes/${recipe._id}`)
    }
    return(
        <div onClick={handleClick} >
            {/*image div */}
            <div>
                <img src={recipe.image} alt="" />
            </div>
            {/*text card div */}
            <div>
                <p>{recipe.name}</p>
                <p>{recipe.preparationTime}</p>
            </div>
        </div>
    )
}

export default RecipeCard