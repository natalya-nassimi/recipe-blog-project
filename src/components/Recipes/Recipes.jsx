import RecipeCard from "./RecipeCard/RecipeCard";
import { recipeIndex } from "../../services/recipes";
import { useEffect, useState } from "react";
import './Recipes.css'
import { UserProvider } from "../../contexts/UserContext";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
const Recipes = ({ filterByUser, userId }) => {

    // ? Hooks

    const [recipes, setRecipe] = useState([]);
    const [queryfilteredRecipes, setQueryFilteredRecipes] = useState([]);
    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] =  useState(true);
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const { data } = await recipeIndex();
                setIsLoading(false);
                const filteredRecipes = filterByUser && userId
                ? data.filter(recipe => recipe.author?._id === userId)
                : data;

                setRecipe(filteredRecipes);
                setQueryFilteredRecipes(filteredRecipes);
            } catch (error) {
                setErrorData(error.response.data)
            }
        }
        getRecipes();
    }, [filterByUser, userId]);
    const handleSearch =(event)=>{
        const query = event.target.value;
        if(query.trim()=== ""){
            setQueryFilteredRecipes(recipes);
        }else{
            if(query.includes("-")){
                const [paramter, searchValue] =  query.split("-");
                if(paramter.toLowerCase() == "name"){
                    const results = recipes.filter(recipe=>{
                        if(recipe.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim())){
                            return true
                        }
                })
                setQueryFilteredRecipes(results)
                }else if(paramter.toLowerCase() == "author"){
                    const results = recipes.filter(recipe=>{
                        if(recipe.author.username.toLowerCase().trim().includes(searchValue.toLowerCase().trim())){
                            return true
                        }
                })
                setQueryFilteredRecipes(results)
                }else if(paramter.toLowerCase() == "ingredient"){
                    const results = recipes.filter(recipe=>{
                        if(recipe.ingredients.some(ingredient=>ingredient.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim()))){
                            return true
                        }
                    })
                    setQueryFilteredRecipes(results);
                }else{
                    const results = {};
                    setQueryFilteredRecipes(results);
                }
            }else{
                const results = recipes.filter(recipe=>{
                    if(recipe.name.toLowerCase().trim().includes(query.toLowerCase().trim()) ||recipe.author.username.trim().toLowerCase().includes(query.toLowerCase().trim()) || recipe.ingredients.some(ingredient=>ingredient.name.toLowerCase().trim().includes(query.toLowerCase().trim()))){
                        return true
                    }
                })
                setQueryFilteredRecipes(results)              
            }

            
        }
    }
    return (
        <>
        {errorData.message?
            <p className="error-message">{errorData.message}</p>
            : (isLoading
                ? <LoadingIcon></LoadingIcon> 
                :<>
                <div className="searchbar-container">
                    <input type="search" name="searchbar" placeholder="Search recipes..." onChange={handleSearch} />
                    <p className="search-tip">Tip: You can search by name author or ingredient but using 'name-', 'author-'' or 'ingredient-'</p>
                    </div>
                    <section className="recipes-container">
                        
                        {queryfilteredRecipes.length > 0 ? queryfilteredRecipes.map(recipe => {
                            return (
                                <RecipeCard key={recipe._id} recipe={recipe} />

                            )
                        }) : <p>No Recipes Found</p>}
                    </section>                
                </>
                )
        

        }
        </>
    )
}
export default Recipes