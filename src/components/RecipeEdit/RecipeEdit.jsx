import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext"
import { recipeShow } from "../../services/recipes";
import { recipeEdit } from "../../services/recipes";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import ImageUploadField from "../ImageUploadField/ImageUpload";
import './RecipeEdit.css'

const RecipeEdit = () => {
    const {user} = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        ingredients: [],
        preparationTime: "",
        image: "",
        instructions: []
    })
    const [progress, setProgress] = useState(0);
    const [errorData, setErrorData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const setMealImage = (imageURL) => {
        setFormData({ ...formData, image: imageURL})
    }
    
    useEffect(() => {
        const getFormData = async () => {
            try {
                const { data } = await recipeShow(recipeId);

                if(data.preparationTime ===null){
                    data.preparationTime = "";
                }
                setFormData(data);
            } catch (error) {
                const {status, data} = error.response;
                 if (status === 500) {
                    setErrorData({ message: 'Something went wrong. Please try again.' });
                } else if(status ===404){
                    toast("The page you are trying to access does not exist")
                    navigate('/page-not-found');
                }else {
                    Object.keys(data).map(parameter =>{
                        toast(data[parameter])
                    })
                    setErrorData(data)
                }
            }finally{
                setIsLoading(false)
            }
        }
        getFormData();
    }, [recipeId, navigate])
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await recipeEdit(recipeId, formData);
            navigate(`/recipes/${recipeId}`);            
        } catch (error) {
            if (error.response.status === 500) {
                toast("Something went wrong! Please try again.")
                setErrorData({ message: 'Something went wrong! Please try again.'});
            } else {
                const {data} = error.response
                Object.keys(data).map(parameter =>{
                    toast(data[parameter])
                })
                setErrorData(data);
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
                    setErrorData(prev => ({ ...prev, ["message"]: 'No recipe name was specified. Please add a recipe name.' }));
                    toast('No recipe name was specified. Please add a recipe name.')
                    return true;
                } else {
                    return false;
                }
            case 1: {
                if (formData.ingredients.length < 1) {
                    setErrorData(prev => ({ ...prev, ["message"]: 'At least 1 ingredient must be specified.' }));
                    toast('At least 1 ingredient must be specified.');
                    return true;
                }
                const ingredientErrors = formData.ingredients.reduce((accumulator, ingredient, index) => {

                    if (ingredient.name.trim() == "") {
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }
                        accumulator[index]["name"] ="No ingredient name was specified. Please add an ingredient name."
                    }
                    if (ingredient.measurement == "") {
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }                        
                        accumulator[index]["measurement"] = "No ingredient quantity was specified. Please add an ingredient quantity.";
                    }else if(ingredient.measurement <0){
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }                        
                        accumulator[index]["measurement"] = "The ingredient quantity specified must not be less than 0.";                        
                    }
                    if (ingredient.unit == "") {
                        if(!accumulator[index]){
                            accumulator[index] ={}   ;
                        }
                        accumulator[index]["unit"] = "No ingredient unit was selected. Please add an ingredient unit.";
                    }
                    return accumulator
                }, {})
                if (Object.keys(ingredientErrors).length == 0) {
                    return false;
                } else if (Object.keys(ingredientErrors).length == 1) {
                    const displayedPositions = Object.keys(ingredientErrors).map(index => parseInt(index)+1);
                    setErrorData(prev => ({ ...prev, ["message"]: ingredientErrors }))
                    toast(`Error on ingredient ${displayedPositions}.`)
                    return true
                } else {
                    const displayedPositions = Object.keys(ingredientErrors).map(index => parseInt(index)+1);
                    setErrorData(prev => ({ ...prev, ["message"]: ingredientErrors }))
                    toast(`You have ${displayedPositions.length} errors on this page, at ingredients ${displayedPositions}.`);
                    return true;
                }
            } case 2:
                if (typeof formData.preparationTime ==="string" && formData.preparationTime.trim() === "") {
                    setErrorData(prev => ({ ...prev, ["message"]: 'No preparation time was specified. Please specify a preparation duration.' }));
                    toast('No preparation time was specified. Please specify a preparation duration.' )
                    return true;
                }else if(formData.preparationTime === null){
                    setErrorData(prev => ({ ...prev, ["message"]: 'No preparation time was specified. Please specify a preparation duration.' }));
                    toast('No preparation time was specified. Please specify a preparation duration.' )
                    return true;
                }
                else if(formData.preparationTime <0){
                    setErrorData(prev => ({ ...prev, ["message"]: 'The preparation time must not be negative. Specify a non negative duration.' }));
                    toast('The preparation time must not be negative. Specify a non negative duration.')
                    return true;
                }else {
                    return false;
                }
            case 3:
                if (formData.instructions.length < 1) {
                    setErrorData(prev => ({ ...prev, ["message"]: 'At least 1 instruction must be specified.' }));
                    toast('At least 1 instruction must be specified.');
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
                        toast(`No instruction was specified at field ${instructionError[0]+1}.`);
                        setErrorData(prev => ({ ...prev, ["message"]:  instructionError }));
                        return true;
                    }else{
                        const displayedPositions = instructionError.map(index => index+1);
                        toast(`You have ${instructionError.length} errors on this page, at fields ${displayedPositions}.`);
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
        const newErrorData = { ...errorData }
        delete newErrorData.message
        setErrorData(newErrorData)
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
                            {errorData.message && <p className="error-message">{errorData.message}</p>}
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
                        <button className='add' onClick={addIngredient}>
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
                                        <button className='remove-btn' onClick={removeIngredient}>
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
                            {errorData.message && <p className="error-message">{errorData.message}</p>}
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
                        <button className='add' onClick={addInstruciton}>Add instruction</button>
                        <ol>
                            {
                                formData.instructions.map((instruction, index) => {
                                    return (
                                        <li className='form-control' key={index} draggable="true">
                                            <textarea value={instruction} name={`instruction-${index}`} onChange={handleInstructionChange} required></textarea>
                                            <button className='remove-btn' onClick={removeInstructions}>Remove</button>
                                           {(errorData.message && errorData.message.constructor === Array && errorData.message.includes(index))? <p  className='error-message'>No instruction was specified.</p>:null} 
                                        </li>
                                    )
                                })
                            }
                        </ol>
                        {errorData.instructions && <p className='error-message'>{errorData.instructions}</p>}
                        <div className="formNavigation">
                            <button onClick={previousPage}>Previous</button>
                            <button onClick={nextPage}>Next</button>
                        </div>
                    </section>
                )
            case 4:
                return (
                    <section>
                        <ImageUploadField
                            labelText="Show off a picture of your meal"
                            fieldName='Image'
                            setImage={setMealImage}
                            existingImage={formData.image}
                        />
                        {errorData.image && <p className='error-message'>{errorData.image}</p>}
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
                        {errorData.message && <p className='error-message'>{errorData.message}</p>}
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

        isLoading ? <LoadingIcon></LoadingIcon>  :

            <section>
                <form action="" onSubmit={handleSubmit}>
                    {currentPage()}
                    <ToastContainer/>
                </form>
            </section>


    )
}

export default RecipeEdit