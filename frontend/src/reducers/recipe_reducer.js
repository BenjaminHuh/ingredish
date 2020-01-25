import { RECEIVE_ALL_RECIPES, RECEIVE_RECIPE } from "../actions/recipe_actions";

// const initialState = {
//   isAuthenticated: false,
//   recipe: {}
// };

export default function (state = {}, action) {
    Object.freeze(state);
    // let nextState;
  switch (action.type) {
 
    case RECEIVE_ALL_RECIPES:
      let newState = {};
      action.recipes.data.forEach(recipe => (newState[recipe._id] = recipe));
      return newState;
    case RECEIVE_RECIPE:
      return action.recipe;
    default:
      return state;
  }
}
