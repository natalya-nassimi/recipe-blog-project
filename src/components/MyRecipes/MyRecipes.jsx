import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Recipes from '../Recipes/Recipes'

const MyRecipes = () => {
    const { user } = useContext(UserContext)

    return (
        <div>
            <Recipes filterByUser={true} userId={user?._id} />
        </div>    
    )
}

export default MyRecipes