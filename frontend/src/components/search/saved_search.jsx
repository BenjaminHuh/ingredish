import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./search_page.scss";
import background from "./background_video.mp4";


class SavedSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedTerm: this.props.match.params.savedTerm
    }
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentDidMount() {
    let terms = [];
    if (this.state.savedTerm) {
      terms = this.state.savedTerm.split(',');
      this.props.fetchRecipes(terms);
    }
   
  }

  saveRecipe(recipeId) {
    this.props.saveRecipe(this.props.currentUser, recipeId);
    this.showNotification();
  }

  showNotification() {
    document.getElementById("note").style.display = "block";
    setTimeout(function () {
      document.getElementById("note").style.display = "none";
    }, 1000);
  }


  render() {

    return (
      <div>
        <video autoPlay muted loop className="background_video">
          <source src={background} type="video/mp4" />
        </video>
        <div id="note">Recipe Saved Successfully</div>
        <div id="no-recipes">
          Sorry, no recipes match all the ingredients.
          <br /> Try with fewer ingredients.
        </div>
        <br />
        <br />
        {this.state.savedTerm ?
          <div className="backtosearch-box">
            <nav className="backtosearch">
              <Link
                className="backtosearch-text"
                to={{ pathname: "/search" }}
              >
                Search with different Ingredients
          </Link>

            </nav>
          </div> : null}
        <div className="recipes">
        <ul>
          {this.props.recipes 
            ? this.props.recipes.map((recipe, idx) => (
              <div
                className="searched_recipe_items"
                key={`recipe-${idx}`}
              >
                <Link className="recipeImg" to={`/recipe/${recipe._id}`}>
                  <img
                    src={recipe.image_url}
                    className="recipeimg"
                    alt="recipe"
                  />
                </Link>

                <div className="recipeinfo">
                  <Link
                    className="recipe-info-link"
                    to={`/recipe/${recipe._id}`}
                  >
                    <h1>{recipe.name}</h1>
                    {recipe.keywords.map((ing, id) => (
                      <li key={id}>{ing}</li>
                    ))}
                  </Link>
                  <button
                    id={recipe.id}
                    type="button"
                    onClick={() => this.saveRecipe(recipe._id)}
                  >
                    {this.props.savedRecipes.includes(recipe._id)
                      ? "Saved"
                      : "Save"}
                  </button>

                </div>
              </div>
            ))
            : null}
          </ul>
          </div>
      
     
      </div>
    );
  }
     
}

export default withRouter(SavedSearch);
