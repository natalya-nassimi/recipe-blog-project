import { useState } from 'react'
import { recipeDelete } from '../../services/recipes'
import { useNavigate } from 'react-router'

const DeleteRecipe = ({ recipeId }) => {

    const [error, setError] = useState({})

    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await recipeDelete(recipeId)
            navigate('/recipes')
        } catch (error) {
            if (error.response.data === 500) {
                setError({ message: 'Something went wrong!' })
            } else {
                setError(error.response.data)
            }
        }
    }

    return (
        <>
            <button className='delete-btn' onClick={handleDelete}>Delete Recipe</button>
            {error.message && <p className='error-message'>{error.message}</p>}
        </>
    )
}

export default DeleteRecipe