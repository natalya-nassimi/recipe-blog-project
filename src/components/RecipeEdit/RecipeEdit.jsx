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
    const handleIngredientChange =  (event)=>{
        const newFormData = {...formData};
        const [element, field] = event.target.name.split('-');
        const positionIdx =  newFormData.ingredients.findIndex(ingredient=> ingredient["name"] ==element);
        newFormData.ingredients[positionIdx][field] = event.target.value;
        setFormData(newFormData)
    }
    const handleInstructionChange = (event)=>{
        const idx =parseInt(event.target.name.split("-")[1]);
        const newFormData = {...formData};
        newFormData.instructions[idx] = event.target.value;
        setFormData(newFormData)
    }
    const addIngredient = (event) => {
        event.preventDefault();
        const newFormData = { ...formData };
        newFormData.ingredients.push({
            name: "",
            measuerment: "",
            unit: "",
        })
        setFormData(newFormData);
    }
    const addInstruciton = (event) => {
        event.preventDefault();
        const newFormData = { ...formData };
        newFormData.instructions.push("")
        setFormData(newFormData);
    }
    const removeIngredient = (event) => {
        event.preventDefault();
        const ingredientDiv = event.target.parentElement;
        const ingredientName = ingredientDiv.children[1].value;
        const newFormData = { ...formData };
        const index = newFormData.ingredients.findIndex(ingredient => ingredient.name === ingredientName)
        newFormData.ingredients = newFormData.ingredients.slice(0, index).concat(newFormData.ingredients.slice(index + 1));
        setFormData(newFormData)
    }
    const removeInstructions = (event) => {
        event.preventDefault();
        const instructionDiv = event.target.parentElement;
        console.log(instructionDiv);
        const instructionName = instructionDiv.children[0].value;
        const newFormData = { ...formData };
        const index = newFormData.instructions.findIndex(instruction => instruction === instructionName)
        newFormData.instructions = newFormData.instructions.slice(0, index).concat(newFormData.instructions.slice(index + 1));
        setFormData(newFormData)
    }
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
                                        <label htmlFor={ingredient.name + `-name`}>Ingredient name</label>
                                        <input type="text" name={ingredient.name + `-name`} value={ingredient.name}  onChange={handleIngredientChange}/>
                                        <label htmlFor={ingredient.name + `-measurement`}>Quantity</label>
                                        <input type="number" name={ingredient.name + `-measurement`} value={ingredient.measurement} onChange={handleIngredientChange}/>
                                        <label htmlFor={ingredient.name + `-unit`}>Unit</label>
                                        <select name={ingredient.name + `-unit`} id="" value={ingredient.unit} onChange={handleIngredientChange}>
                                            <option value="cup">cup</option>
                                            <option value="gallon">gallon</option>
                                            <option value="gram">gram</option>
                                            <option value="litre">litre</option>
                                            <option value="kilogram">kilogram</option>
                                            <option value="ounce">ounce</option>
                                            <option value="quart">quart</option>
                                            <option value="tbsp">tbsp</option>
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
                                            <label htmlFor={`instruction-${index}`}>Step {`${index}`}</label>
                                            <textarea value={instruction} name={`instruction-${index}`} onChange={handleInstructionChange}></textarea>
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