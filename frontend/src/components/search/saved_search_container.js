import { connect } from 'react-redux';
import SavedSearch from './saved_search';
import { fetchAllRecipes, saveRecipe, getSavedRecipes } from "../../actions/recipe_actions";


const mapStateToProps = (state,{searchTerm}) => {
    return {
        recipes: Array.from(Object.values(state.recipes)),
        searchTerm: searchTerm,
        savedRecipes: Object.keys(state.saved_recipes),
        currentUser: state.session.user
    }
};


const mapDispatchToProps = dispatch => ({
    fetchRecipes: search => dispatch(fetchAllRecipes(search)),
    saveRecipe: (currentUser, recipeId) =>
        dispatch(saveRecipe(currentUser, recipeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearch);