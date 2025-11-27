
import { toast } from "react-toastify";
import { recipeCommentCreate } from "../../services/recipes";
import { useState } from "react";
const CommentCreate = ({recipe, recipeId, setRecipe, user}) => {
    const [formData, setFormData] = useState({
        rating: "",
        description: "",
        author: {}
    });
    console.log(user)
    const [errorData, setErrorData] = useState({})
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const handleWriteComment = (event) => {
        event.preventDefault()
        if (!user) {
            navigate("/sign-in")
        } else {
            setIsCommentOpen(true);
        }
    }
    const handleChange = (event) => {
        const description = event.target.value;
        setFormData({...formData, [event.target.name]: description})

    }
    const handleSubmitComment = async (event) => {
        event.preventDefault()
        try {
            const { data } = await recipeCommentCreate(recipeId,formData);
            toast("Successfully created comment.");
            // console.log( {...formData, [author]: user})
            setRecipe(prev => ({...prev, ["comments"]: [...prev["comments"], {...formData, ["author"]: user}]}))
            setFormData({
                rating: "",
                description: ""                 
            })
            setIsCommentOpen(false);
        } catch (error) {
            console.log(error)
            setErrorData(error.response.data);
            toast(error.response.data.message);
        }
    }
    console.log(formData)
    return (
        <div>
            {!recipe.comments.length > 0 &&
                <p>Be the first to leave a comment.</p>
            }
            {!isCommentOpen && <button onClick={handleWriteComment}>Leave comment</button>}
            {isCommentOpen && <div>
                <form action="">
                    <textarea name="description" onChange={handleChange} value={formData.description} required>  </textarea>
                    <button onClick={() => setIsCommentOpen(false)}>Close</button>
                    <button onClick={handleSubmitComment}>Post</button>                    
                </form>

            </div>
            }
        </div>

    )
}

export default CommentCreate