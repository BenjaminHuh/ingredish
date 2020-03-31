import * as APIUtil from "../util/recipes_api_util";

export const RECEIVE_ALL_RECIPES = "RECEIVE_ALL_RECIPES";
export const RECEIVE_RECIPE = "RECEIVE_RECIPE";


export const receiveRecipes = recipes => {
    return {
        type: RECEIVE_ALL_RECIPES,
        recipes
    }
};

export const receiveRecipe = recipe => {
    return {
        type: RECEIVE_RECIPE,
        recipe
    }
}

export const fetchAllRecipes = (search) => dispatch => {
    return (APIUtil.fetchRecipes(search).then(res =>
        dispatch(receiveRecipes(res))))
}

export const fetchRecipe = (id) => dispatch => {
    return (APIUtil.fetchRecipe(id).then(res => dispatch(receiveRecipes(res))));
}

export const updateRecipe = (id, comment) => dispatch => {
    return APIUtil.updateRecipe(id, comment).then(recipe => dispatch({
        type: "RECEIVE_RECIPE",
        recipe
    }))
}

export const getSavedRecipes = currentUser => dispatch =>
    APIUtil.getSavedRecipes(currentUser).then(recipes =>
        dispatch({
            type: "RECEIVE_SAVED_RECIPES",
            recipes
        })
    );

export const getRecipe = id => dispatch => {
    APIUtil.getRecipe(id).then(recipe => dispatch({
        type: "RECEIVE_RECIPE",
        recipe
    }))
}

export const saveRecipe = (currentUser, recipeId) => dispatch =>
    APIUtil.saveRecipe(currentUser, recipeId).then(recipes =>
        dispatch({
            type: "RECEIVE_SAVED_RECIPES",
            recipes
        })
    );

export const removeSavedRecipe = (currentUser, recipeId) => dispatch =>
    APIUtil.removeSavedRecipe(currentUser, recipeId).then(recipes =>
        dispatch({
            type: "RECEIVE_SAVED_RECIPES",
            recipes
        })
    );