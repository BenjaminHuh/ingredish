import { connect } from "react-redux";
import { getSavedRecipes, removeSavedRecipe } from "../../actions/recipe_actions.js"
import Saved from "./saved";

const mSTP = state => {
    return {
        currentUser: state.session.user,
        savedRecipes: Object.values(state.saved_recipes)
    };
};

const mDTP = dispatch => {
    return {
        getSavedRecipes: currentUser => dispatch(getSavedRecipes(currentUser)),
        removeSavedRecipe: (currentUser, recipeId) =>
        dispatch(removeSavedRecipe(currentUser, recipeId))
    };
};

export default connect(mSTP, mDTP)(Saved);
