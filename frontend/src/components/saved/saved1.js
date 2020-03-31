import React from "react";
import { Link } from "react-router-dom";
import "./saved.scss";

class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.removeSavedRecipe = this.removeSavedRecipe.bind(this);
  }

  componentDidMount() {
    this.props.getSavedRecipes(this.props.currentUser);
  }

  removeSavedRecipe(recipeId) {
    this.props.removeSavedRecipe(this.props.currentUser, recipeId);
  }

  render() {
    if (this.props.savedRecipes.length === 0) {
      return (
        <div>
          <div className="savedbackground"></div>
          <div className="backtosearch-box">
            <nav className="backtosearch">
              <br />
              <br />
              <br />
              <br />
              <br />
              <Link className="backtosearch-text" to={{ pathname: "/search" }}>
                No Saved Recipes! Click to go Back to Search
              </Link>
            </nav>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="savedbackground"></div>
          <div className="recipes">
            <br />
            <br />

            <ul>
              {this.props.savedRecipes.map((recipe, idx) => (
                <div className="searched_recipe_items" key={`recipe-${idx}`}>
                  <Link to={`/recipe/${recipe._id}`}>
                    <img
                      src={recipe.image_url}
                      className="recipeimg"
                      alt="recipe"
                    />
                  </Link>
                  <div className="recipeinfo">
                    <h1>{recipe.name}</h1>
                    {recipe.keywords.map((ing, id) => (
                      <li key={id}>{ing}</li>
                    ))}
                    <button
                      id={recipe.id}
                      type="button"
                      onClick={() => this.removeSavedRecipe(recipe._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </ul>

            <div className="backtosearch-box">
              <nav className="backtosearch">
                <Link
                  className="backtosearch-text"
                  to={{ pathname: "/search" }}
                >
                  Back to Search
                </Link>
              </nav>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Saved;
