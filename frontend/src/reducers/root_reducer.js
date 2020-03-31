import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import saved_recipes from "./saved_recipes_reducer"
import recipes from './recipe_reducer';
import ui from "./ui_reducer";

const RootReducer = combineReducers({
    saved_recipes,
    session,
    recipes,
    errors,
    ui
});

export default RootReducer;
