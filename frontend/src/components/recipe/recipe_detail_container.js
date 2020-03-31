import { connect } from "react-redux";
import { fetchRecipe, updateRecipe, getRecipe, saveRecipe, getSavedRecipes } from "../../actions/recipe_actions";
import RecipeDetail from "./recipe_detail";

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        recipeId: ownProps.match.params.recipeId,
        recipe: Object.values(state.recipes)[0],
        savedRecipes: Object.keys(state.saved_recipes)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRecipe: id => dispatch(fetchRecipe(id)),
        addComment: (id, comment) => dispatch(updateRecipe(id, comment)),
        getRecipe: id => dispatch(getRecipe(id)),
        saveRecipe: (currentUser, recipeId) =>
            dispatch(saveRecipe(currentUser, recipeId)),
        getSavedRecipes: currentUser => dispatch(getSavedRecipes(currentUser))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
