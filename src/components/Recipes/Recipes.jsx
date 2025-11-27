import RecipeCard from "./RecipeCard/RecipeCard";
import { recipeIndex } from "../../services/recipes";
import { useEffect, useState } from "react";
import './Recipes.css'
import { UserProvider } from "../../contexts/UserContext";

const Recipes = ({ filterByUser, userId }) => {

    // ? Hooks

    const [recipes, setRecipe] = useState([]);
    const [queryfilteredRecipes, setQueryFilteredRecipes] = useState([]);
    const [errorData, setErrorData] = useState({})
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const { data } = await recipeIndex();
                
                const filteredRecipes = filterByUser && userId
                ? data.filter(recipe => recipe.author?._id === userId)
                : data;

                setRecipe(filteredRecipes);
                setQueryFilteredRecipes(filteredRecipes);
            } catch (error) {
                console.log(error)
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
                        console.log(recipe.name, searchValue)
                        if(recipe.name.toLowerCase().includes(searchValue.toLowerCase())){
                            return true
                        }
                })
                setQueryFilteredRecipes(results);
                console.log(results)  
                }else if(paramter.toLowerCase() == "author"){
                    const results = recipes.filter(recipe=>{
                        if(recipe.author.username.toLowerCase().includes(searchValue.toLowerCase())){
                            return true
                        }
                })
                setQueryFilteredRecipes(results);
                console.log(results)  
                }else if(paramter.toLowerCase() == "ingredient"){
                    const results = recipes.filter(recipe=>{
                        if(recipe.ingredients.some(ingredient=>ingredient.name.toLowerCase().includes(searchValue.toLowerCase()))){
                            return true
                        }
                    })
                    setQueryFilteredRecipes(results);
                    console.log(results)  
                }else{
                    const results = {};
                    setQueryFilteredRecipes(results);
                    console.log(results)
                }
            }else{
                const results = recipes.filter(recipe=>{
                    if(recipe.name.toLowerCase().includes(searchValue.toLowerCase()) ||recipe.author.username.toLowerCase().includes(searchValue.toLowerCase()) || recipe.ingredients.some(ingredient=>ingredient.name.toLowerCase().includes(searchValue.toLowerCase()))){
                        return true
                    }
                })
                setQueryFilteredRecipes(results);
                console.log(results)                
            }

            
        }
    }
    return (
        <>
        {errorData.message?
            <p className="error-message">{errorData.message}</p>
            :<>
            <label htmlFor="searchbar">Search</label>
            <input type="search" name="searchbar" placeholder="Search by recipe name, ingredients or author" onChange={handleSearch} />
            <p>Tip: You can search by specifically name author or ingredient but using "name-", "author-" or "ingredient-"</p>
            <section className="recipes-container">
                
                {queryfilteredRecipes.length > 0 ? queryfilteredRecipes.map(recipe => {
                    return (
                        <RecipeCard key={recipe._id} recipe={recipe} />

                    )
                }) : <p>No Recipes Found</p>}
            </section>
            </>
        }
        </>
    )
}
export default Recipes