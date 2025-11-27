import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { ToastContainer, toast } from "react-toastify";
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

            await recipeCreate(formData);
            navigate(`/recipes/${data._id}`);
        } catch (error) {
            console.log(error)
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
    const validatePage = () => {
        switch (progress) {
            case 0:
                if (formData.name.trim() === "") {
                    setErrorData(prev => ({ ...prev, ["message"]: 'No recipe name was specified. Please add recipe name' }));
                    toast('No recipe name was specified. Please add a recipe name')
                    return true;
                } else {
                    return false;
                }
            case 1:
                if (formData.ingredients.length < 1) {
                    setErrorData(prev => ({ ...prev, ["message"]: 'At least 1 ingredient must be added' }));
                    toast('At least 1 ingredient must be added');
                    return true;
                }
                const ingredientErrors = formData.ingredients.reduce((accumulator, ingredient, index) => {

                    if (ingredient.name.trim() == "") {
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }
                        accumulator[index]["name"] ="No ingredient name was specified. Please add ingredient name"
                    }
                    if (ingredient.measurement == "") {
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }                        
                        accumulator[index]["measurement"] = "No ingredient quantity was specified. Please add ingredient quantity";
                    }else if(ingredient.measurement <0){
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }                        
                        accumulator[index]["measurement"] = "Ingredient quantity must not be less than 0";                        
                    }
                    if (ingredient.unit == "") {
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }
                        accumulator[index]["unit"] = "No ingredient unit was selected. Please add ingredient unit";
                    }
                    return accumulator
                }, {})
                if (Object.keys(ingredientErrors).length == 0) {
                    return false;
                } else if (Object.keys(ingredientErrors).length == 1) {
                    const displayedPositions = Object.keys(ingredientErrors).map(index => parseInt(index)+1);
                    setErrorData(prev => ({ ...prev, ["message"]: ingredientErrors }))
                    toast(`Error on ingredient ${displayedPositions}`)
                    return true
                } else {
                    const displayedPositions = Object.keys(ingredientErrors).map(index => parseInt(index)+1);
                    setErrorData(prev => ({ ...prev, ["message"]: ingredientErrors }))
                    toast(`You have ${displayedPositions.length} errors on this page, at ingredients ${displayedPositions}`);
                    return true;
                }
            case 2:
                if (formData.preparationTime.trim() === "") {
                    setErrorData(prev => ({ ...prev, ["message"]: 'No preparation time was specified. Please specify preparation time' }));
                    toast('No preparation time was specified. Please specify preparation time' )
                    return true;
                }
                 else if(formData.preparationTime <0){
                    setErrorData(prev => ({ ...prev, ["message"]: 'The preparation time must not be negative' }));
                    toast('The preparation time must not be negative')
                    return true;
                }else {
                    return false;
                }
            case 3:
                if (formData.instructions.length < 1) {
                    setErrorData(prev => ({ ...prev, ["message"]: 'At least 1 instruction must be added' }));
                    toast('At least 1 instruction must be added');
                    return true;
                }else{
                    const instructionError = formData.instructions.reduce((accumulator, instruction, index)=>{
                        if(instruction.trim()==""){
                            accumulator.push(index);
                        }
                        return accumulator;
                    }, [])
                    if(instructionError.length ==0){
                        return false;
                    }else if(instructionError.length==1){
                        toast(`No instruction was specified at field ${instructionError[0]+1}`);
                        setErrorData(prev => ({ ...prev, ["message"]:  instructionError }));
                        return true;
                    }else{
                        const displayedPositions = instructionError.map(index => index+1);
                        toast(`You have ${instructionError.length} errors on this page, at fields ${displayedPositions}`);
                        setErrorData(prev => ({ ...prev, ["message"]:  instructionError }));
                        return true;
                    }
                }
            case 4:
                return false
        }
    }
    const nextPage = (event) => {
        event.preventDefault()
        if (!validatePage()) {
            const newErrorData = { ...errorData }
            delete newErrorData.message
            setErrorData(newErrorData)
            setProgress(prev => prev + 1)
        }
    }
    const previousPage = (event) => {
        event.preventDefault()
        setProgress(prev => prev - 1)
    }
    const currentPage = () => {
        switch (progress) {
            case 0:
                return (
                    <section>
                        <div className="form-control">
                            <label htmlFor="name">Recipe Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                            {errorData.name && <p className='error-message'>{errorData.name}</p>}
                        </div>
                        <div className="formNavigation">
                            <button onClick={nextPage} >Next</button>
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
                                        <input type="text" name={ingredient.name + `-name`} value={ingredient.name} onChange={handleIngredientChange} required />
                                        {(errorData.message && typeof errorData.message === 'object' && errorData.message[index] && errorData.message[index]["name"])? <p className='error-message'>{errorData.message[index]["name"]}</p>:null} 
                                        <label htmlFor={ingredient.name + `-measurement`}>Quantity</label>
                                        <input type="number" name={ingredient.name + `-measurement`} value={ingredient.measurement} onChange={handleIngredientChange} min="0" required />
                                        {(errorData.message && typeof errorData.message === 'object'&& errorData.message[index] && errorData.message[index]["measurement"])? <p className='error-message'>{errorData.message[index]["measurement"]}</p>:null}
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
                                        {(errorData.message && typeof errorData.message === 'object' && errorData.message[index] && errorData.message[index]["unit"])? <p className='error-message'>{errorData.message[index]["unit"]}</p>:null}
                                        <button onClick={removeIngredient}>
                                            Remove
                                        </button>
                                    </div>
                                )
                            })}
                            {errorData.name && <p className='error-message'>{errorData.name}</p>}
                            {errorData.measurement && <p className='error-message'>{errorData.measurement}</p>}
                            {errorData.unit && <p className='error-message'>{errorData.unit}</p>}
                        </div>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage}>Next</button>
                        </div>
                    </section>
                )
            case 2:
                return (
                    <section>
                        <div className="form-control">
                            <label htmlFor="preparationTime">How long does it take to prepare in hours</label>
                            <input type="number" name="preparationTime" id="" value={formData.preparationTime} min="0" onChange={handleChange} required />
                            {}
                            {errorData.preparationTime && <p className='error-message'>{errorData.preparationTime}</p>}
                        </div>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage}>Next</button>
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
                                           {(errorData.message && errorData.message.constructor === Array && errorData.message.includes(index))? <p  className='error-message'>No instruction was specified</p>:null} 
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage}>Next</button>
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
                            <button onClick={nextPage}>Next</button>
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
            <ToastContainer />
        </section>


    )
}

export default RecipeCreate