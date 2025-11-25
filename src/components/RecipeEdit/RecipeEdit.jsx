import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { recipeShow } from "../../services/recipes";
const RecipeEdit = ()=>{
    const [recipe, setRecipe] =  useState({});
    const [formData, setFormData] =  useState({
        name: "",
        ingredients: [],
        preparationTime: "",
        image: "",
        instructions: []
    })
    const [instructionInput, setInstructionInput] = useState("");
    const [ingredientInput, setIngredientsInput] =  useState("");
    const [isLoading, setIsLoading] = useState(true)
    const {recipeId} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const getFormData = async()=>{
            try {
                const {data} = await recipeShow(recipeId);
                console.log(data)
                setFormData(data)
                const {instructions, ingredients} = data;
                console.log(instructions[instructions.length -1])
                if(instructions.length>0) setInstructionInput(instructions[instructions.length -1]);
                if(ingredients.length>0) setIngredientsInput(ingredients[ingredients.length -1]);
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
    const addItem = ()=>{
        formData.
        return
    }
    const removeiTEM =  ()=>{
        
    }
    return (
        isLoading?<p>Loading Screen</p>:
        <section>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="form-control">
                    <label htmlFor="ingredient">Ingredients</label>
                    <input type="text" name="ingredient" value={ingredientInput} id="" onChange={handleChange}/>
                    <button>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>    
                    </button>
                </div>

                <div className="form-control">
                    <label htmlFor="preparationTime">How long does it take to prepare</label>
                    <input type="number" name="preparationTime" id="" value={formData.preparationTime} onChange={handleChange}/>
                </div>

                <div className="form-control">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea name="instructions" value={instructionInput} id="" onChange={handleChange}>
                    </textarea>
                    <button>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>    
                    </button>
                </div>

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