import { connect } from "react-redux";
import { fetchAllRecipes, saveRecipe, getSavedRecipes } from "../../actions/recipe_actions";
import SearchPage from "./search_page";
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
    return {
        currentUser: state.session.user,
        recipes: Object.values(state.recipes),
        savedRecipes: Object.keys(state.saved_recipes)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSavedRecipes: currentUser => dispatch(getSavedRecipes(currentUser)),
        fetchRecipes: search => dispatch(fetchAllRecipes(search)),
        closeModal: () => dispatch(closeModal()),
        saveRecipe: (currentUser, recipeId) =>
            dispatch(saveRecipe(currentUser, recipeId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
