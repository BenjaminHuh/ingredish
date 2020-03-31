import axios from "axios";

export const fetchRecipes = (search) => {
    return axios.get(`/api/recipes/?search=${search}`);
};

export const fetchRecipe = (id) => {
    return axios.get(`/api/recipes/${id}`);
};

export const updateRecipe = (id, comment) => {
    return axios.patch(`/api/recipes/${id}/?search=${comment}`);
}

export const getSavedRecipes = currentUser => {
    return axios.get(`/api/users/${currentUser.id}/recipes`);
}

export const saveRecipe = (currentUser, recipeId) => {
    return axios.post(`/api/users/${currentUser.id}/recipes`, recipeId);
}

export const removeSavedRecipe = (currentUser, recipeId) => {
    return axios.delete(`/api/users/${currentUser.id}/${recipeId}`);
}

export const getRecipe = id => {
    return axios.get(`/api/recipes/${id}`);
}