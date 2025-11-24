const RecipeCard = ({recipe})=>{
    return(
        <div>
            <div>
                <img src={recipe.image} alt="" />
            </div>
            <div>
                <p>{recipe.name}</p>
                <p>{recipe.preparationTime}</p>
            </div>
        </div>
    )
}

export default RecipeCard