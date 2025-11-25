import axios from "axios"
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/recipes`
    
})


export const recipeIndex = ()=>{
    return api.get('');
}

export const recipeShow = (recipeId)=>{
    return api.get(`/${recipeId}`);
}