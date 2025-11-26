import { useState, useContext} from "react";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

import { recipeCreate } from "../../services/recipes";
const RecipeCreate = () => {
    const { user } = useContext(UserContext)
    const [formData, setFormData] = useState({
        name: "",
        ingredients: [],
        preparationTime: "",
        image: "",
        instructions: []
    })
    const [errorData, setErrorData] = useState({});
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const {data} = await recipeCreate(formData);
            navigate(`/recipes/${data._id}`);            
        } catch (error) {
            if (error.response.status === 500) {
                return setErrorData({ message: 'Something went wrong!' })
            } else {
                setErrorData(error.response.data)
            }            
        }

    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }
    const handleIngredientChange = (event) => {
        const newFormData = { ...formData };
        const [element, field] = event.target.name.split('-');
        const positionIdx = newFormData.ingredients.findIndex(ingredient => ingredient["name"] == element);
        newFormData.ingredients[positionIdx][field] = event.target.value;
        setFormData(newFormData);
    }
    const handleInstructionChange = (event) => {
        const idx = parseInt(event.target.name.split("-")[1]);
        const newFormData = { ...formData };
        newFormData.instructions[idx] = event.target.value;
        setFormData(newFormData);
    }
    const addIngredient = (event) => {
        event.preventDefault();
        const newFormData = { ...formData };
        newFormData.ingredients.push({
            name: "",
            measurement: "",
            unit: "",
        })
        setFormData(newFormData);
    }
    const addInstruciton = (event) => {
        event.preventDefault();
        const newFormData = { ...formData };
        newFormData.instructions.push("");
        setFormData(newFormData);
    }
    const removeIngredient = (event) => {
        event.preventDefault();
        const ingredientDiv = event.target.parentElement;
        const ingredientName = ingredientDiv.children[1].value;
        const newFormData = { ...formData };
        const index = newFormData.ingredients.findIndex(ingredient => ingredient.name === ingredientName);
        newFormData.ingredients = newFormData.ingredients.slice(0, index).concat(newFormData.ingredients.slice(index + 1));
        setFormData(newFormData)
    }
    const removeInstructions = (event) => {
        event.preventDefault();
        const instructionDiv = event.target.parentElement;
        const index = parseInt(instructionDiv.children[0].name.split("-")[1]);
        const newFormData = { ...formData };
        newFormData.instructions = newFormData.instructions.slice(0, index).concat(newFormData.instructions.slice(index + 1));
        setFormData(newFormData);
    }
    const validatePage = ()=>{
        switch (progress){
            case 0:
                return formData.name.trim() === "" ? true :false ; 
            case 1:
                return formData.ingredients.some(ingredient=> ingredient.name.trim()== "" || ingredient.measurement=="" || ingredient.unit =="");
            case 2:
                return false;
            case 3:
                if(formData.instructions.length<1){
                    return true
                }
                return formData.instructions.some(ingredient=> ingredient.trim()== "" )
            case 4:
                return false
        }
    }
    const nextPage = (event)=>{
        event.preventDefault()
        if(!validatePage()){
            setProgress(prev=> prev+1)            
        }
    }
    const previousPage = (event)=>{
        event.preventDefault()
        setProgress(prev=> prev-1)
    }
    const currentPage = () => {
        switch (progress) {
            case 0:
                return (
                    <section>
                        <div className="form-control">
                            <label htmlFor="name">Recipe Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="formNavigation">
                            <button onClick={nextPage} disabled={validatePage()}>Next</button>                            
                        </div>
                    </section>
                )
            case 1:
                return (
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
                                        <input type="text" name={ingredient.name + `-name`} value={ingredient.name} onChange={handleIngredientChange} required/>
                                        <label htmlFor={ingredient.name + `-measurement`}>Quantity</label>
                                        <input type="number" name={ingredient.name + `-measurement`} value={ingredient.measurement} onChange={handleIngredientChange} min="0" required />
                                        <label htmlFor={ingredient.name + `-unit`}>Unit</label>
                                        <select name={ingredient.name + `-unit`} id="" value={ingredient.unit} onChange={handleIngredientChange} required>
                                            <option value="">Choose a unit type</option>
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
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage} disabled={validatePage()}>Next</button>                            
                        </div>
                    </section>
                )
            case 2:
                return (
                    <section>
                        <div className="form-control">
                            <label htmlFor="preparationTime">How long does it take to prepare in hours</label>
                            <input type="number" name="preparationTime" id="" value={formData.preparationTime} min="0" onChange={handleChange} />
                        </div>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage} disabled={validatePage()}>Next</button>                            
                        </div>
                    </section>
                )
            case 3:
                return (
                    <section >
                        <h3>Instructions</h3>
                        <button onClick={addInstruciton}>Add instruction</button>
                        <ol>
                            {
                                formData.instructions.map((instruction, index) => {
                                    return (
                                        <li key={index} draggable="true">
                                            <textarea value={instruction} name={`instruction-${index}`} onChange={handleInstructionChange} required></textarea>
                                            <button onClick={removeInstructions}>Remove</button>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage} disabled={validatePage()}>Next</button>                            
                        </div>
                    </section>
                )
            case 4:
                return (
                    <section>
                        <div className="form-control">
                            <label htmlFor="image">Show off a picture of your meal</label>
                            <input type="file" name="image" id="" accept="image/*" value={formData.image} onChange={handleChange} />
                        </div>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage} disabled={validatePage()}>Next</button>                            
                        </div>
                    </section>
                )
            case 5:
                return (
                    <section>
                        <h1>All set?</h1>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button type="submit">Submit</button>                          
                        </div>                    
                    </section>
                )
        }
    }
    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return (
            <section>
                <form action="" onSubmit={handleSubmit}>
                    {currentPage()}
                </form>
            </section>


    )
}

export default RecipeCreate