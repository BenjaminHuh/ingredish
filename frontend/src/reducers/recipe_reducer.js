import { RECEIVE_ALL_RECIPES, RECEIVE_RECIPE } from "../actions/recipe_actions";

export default function (state = {}, action) {
    Object.freeze(state);
    let newState = {};
    
    switch (action.type) {

        case RECEIVE_ALL_RECIPES:
            action.recipes.data.forEach(recipe => (newState[recipe._id] = recipe));
            return newState;

        case RECEIVE_RECIPE:
            newState[action.recipe.data._id] = action.recipe.data;
            return newState;

        default:
            return state;
    }
}
