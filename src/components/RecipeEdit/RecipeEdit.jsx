import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { recipeShow } from "../../services/recipes";

const RecipeEdit = () => {
    const [recipe, setRecipe] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        ingredients: [],
        preparationTime: "",
        image: "",
        instructions: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const { recipeId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getFormData = async () => {
            try {
                const { data } = await recipeShow(recipeId);
                setFormData(data)
                setIsLoading(false)
            } catch (error) {

            }
        }
        getFormData();
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();

        navigate(`/recipes/${recipeId}`)
    }
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
    const addIngredient = (event) => {
        event.preventDefault();
        const newIngredient = { ...formData };
        newIngredient.ingredients.push({
            name: "",
            measuerment: "",
            unit: "",
        })
        setFormData(newIngredient);
    }
    const addInstruciton = (event) => {
        event.preventDefault();
        const newInstruction = { ...formData };
        newInstruction.instructions.push("")
        setFormData(newInstruction);
    }
    const removeIngredient = (event) => {
        event.preventDefault();
        const ingredientDiv = event.target.parentElement;
        const ingredientName = ingredientDiv.children[1].value;
        const removeIngredient = { ...formData };
        const index = removeIngredient.ingredients.findIndex(ingredient => ingredient.name === ingredientName)
        removeIngredient.ingredients = removeIngredient.ingredients.slice(0, index).concat(removeIngredient.ingredients.slice(index + 1));
        setFormData(removeIngredient)
    }
    const removeInstructions = (event) => {
        event.preventDefault();
        const instructionDiv = event.target.parentElement;
        console.log(instructionDiv);
        const instructionName = instructionDiv.children[0].value;
        const removeInstruction = { ...formData };
        const index = removeInstruction.instructions.findIndex(instruction => instruction === instructionName)
        removeInstruction.instructions = removeInstruction.instructions.slice(0, index).concat(removeInstruction.instructions.slice(index + 1));
        setFormData(removeInstruction)
    }
    console.log(formData)
    return (
        isLoading ? <p>Loading Screen</p> :
            <section>
                <form action="" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="name">Recipe Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <section>
                        <h3>Ingredients</h3>
                        <button onClick={addIngredient}>
                            <p>Add Ingredients</p>
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        </button>
                        <div>
                            {formData.ingredients.map((ingredient, index) => {
                                return (
                                    <div className="form-control" key={index}>
                                        <label htmlFor={ingredient.name + `name`}>Ingredient name</label>
                                        <input type="text" name={ingredient.name + `name`} value={ingredient.name} />
                                        <label htmlFor={ingredient.name + `measurement`}>Quantity</label>
                                        <input type="number" name={ingredient.name + `measurement`} />
                                        <label htmlFor={ingredient.name + `unit`}>Unit</label>
                                        <select name="" id="">
                                            <option value="">cup</option>
                                            <option value="">gallon</option>
                                            <option value="">gram</option>
                                            <option value="">litre</option>
                                            <option value="">kilogram</option>
                                            <option value="">ounce</option>
                                            <option value="">quart</option>
                                            <option value="">tbsp</option>
                                        </select>
                                        <button onClick={removeIngredient}>
                                            Remove
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    <div className="form-control">
                        <label htmlFor="preparationTime">How long does it take to prepare</label>
                        <input type="number" name="preparationTime" id="" value={formData.preparationTime} onChange={handleChange} />
                    </div>

                    <section >
                        <h3>Instructions</h3>
                        <button onClick={addInstruciton}>Add instruction</button>
                        <ol>
                            {
                                formData.instructions.map((instruction, index) => {
                                    return (
                                        <li key={index} draggable="true">
                                            <textarea value={instruction}></textarea>
                                            <button onClick={removeInstructions}>Remove</button>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </section>

                    <div className="form-control">
                        <label htmlFor="image">Show off a picture of your meal</label>
                        <input type="file" name="image" id="" accept="image/*" value={formData.image} onChange={handleChange} />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </section>


    )
}

export default RecipeEdit