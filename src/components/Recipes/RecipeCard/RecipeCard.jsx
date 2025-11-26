import './RecipeCard.css'
import { useNavigate } from "react-router";
import defaultImage from '../../../assets/default-image.png'

const RecipeCard = ({recipe})=>{

    // ? Hooks
    const navigate = useNavigate();

    // ? handler functions

    const handleClick = () => {
        navigate(`/recipes/${recipe._id}`)
    }
    return(
        <div className='recipe-card' onClick={handleClick} >
            {/*image div */}
            <div>
                <img className='recipe-card-image' src={recipe.image || defaultImage} alt={recipe.name} />
            </div>
            {/*text card div */}
            <div className='recipe-card-content'>
                <p className='recipe-name'> {recipe.name}</p>
                <p className='prep-time'>Preparation Time: {recipe.preparationTime}</p>
                <p className='author'>Posted By: {recipe.author.username}</p>
            </div>
        </div>
    )
}

export default RecipeCard