import axios from "axios"
import { getToken } from "../utils/token";
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/recipes`
});


export const recipeIndex = ()=>{
    return api.get('');
}

export const recipeShow = (recipeId)=>{
    return api.get(`/${recipeId}`);
}
export const recipeCreate = (formData)=>{
    return api.post('', formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}
export const recipeEdit = (recipeId, formData)=>{
    return api.put(`/${recipeId}`, formData, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export const recipeDelete = (recipeId) => {
    return api.delete(`${recipeId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}