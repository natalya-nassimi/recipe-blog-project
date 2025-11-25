import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { recipeShow } from "../../services/recipes";
import IngredientChip from "./IngredientsEdit/IngredientsEdit";
const RecipeEdit = ()=>{
    const [recipe, setRecipe] =  useState({});
    const [formData, setFormData] =  useState({
        name: "",
        ingredients: [],
        preparationTime: "",
        image: "",
        instructions: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const {recipeId} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const getFormData = async()=>{
            try {
                const {data} = await recipeShow(recipeId);
                setFormData(data)
                setIsLoading(false)
            } catch (error) {
                
            }
        }
        getFormData();
    }, [])
    const handleSubmit = (event)=>{
        event.preventDefault();

    }
    const handleChange = (event)=>{
        setFormData({...formData,
             [e.target.name]: e.target.value
        });

    }
    const handleArrayChanges =  ()=>{

    }
    const addIngredient = ()=>{
        const newIngredient = {...formData};
        newIngredient.ingredients.push({
            name:"",
            measuerment: "",
            unit: "",
        })
        setFormData(newIngredient);
    }
    const addInstruciton = ()=>{
        const newInstruction = {...formData};
        newInstruction.instructions.push("")
        setFormData(newInstruction);        
    }
    const removeIngredient =  (event)=>{
        console.log(event.target.parentElement);
        const ingredientDiv =event.target.parentElement ;
        console.log(ingredientDiv.children)
    }
    const dragStart = ()=>{

    }
    console.log(formData)
    return (
        isLoading?<p>Loading Screen</p>:
        <section>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <section>
                    <h3>Ingredients</h3>
                    <button onClick={addIngredient}>
                        <p>Add Ingredients</p>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>    
                    </button>
                    <IngredientChip ingredients={formData.ingredients}>
                        <button onClick={removeIngredient}>
                            Remove
                        </button>
                    </IngredientChip>
                </section>

                <div className="form-control">
                    <label htmlFor="preparationTime">How long does it take to prepare</label>
                    <input type="number" name="preparationTime" id="" value={formData.preparationTime} onChange={handleChange}/>
                </div>

                <section >
                    <h3>Instructions</h3>
                    <button onClick={addInstruciton}>Add instruction</button>
                    <ol onDragStart={dragStart}>
                        {
                            formData.instructions.map((instruction, index)=>{
                                return(
                                    <li key={index} draggable="true">
                                        <textarea value={instruction}></textarea>
                                        <button>Remove</button>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </section>

                <div className="form-control">
                    <label htmlFor="image">Show off a picture of your meal</label>
                    <input type="file" name="image" id="" accept="image/*" value={formData.image} onChange={handleChange}/>
                </div>

                <button type="submit">Submit</button>
            </form>
        </section>


    )
}

export default RecipeEdit