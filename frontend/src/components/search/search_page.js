import React from "react";
// import Recipe from "./../../../../models/Recipe";
// import axios from 'axios';
// import RecipeDetail from './../recipe/recipe_detail';
import { Link/*, Route*/ } from "react-router-dom";
import "./search_page.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchKeyword } from "./../../actions/keyword_actions";

class SearchPage extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: [],
      searchVal: "",
      keywordValid: true,
      alreadyEnteredIng: false,
      SearchRes : false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addSearch = this.addSearch.bind(this);
    this.deleteIng = this.deleteIng.bind(this);

    this.props.fetchRecipes(this.state.searchTerm);
  }

 
  update(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }


  async getKeywordValid() {
    try {
      let search = this.state.searchVal;
      let res = await fetchKeyword(this.state.searchVal);

      if (res.data && !this.state.searchTerm.some(ing => ing === search)) {
        this.setState({
          searchTerm: [...this.state.searchTerm, search],
          keywordValid: true,
          alreadyEnteredIng: false
        });
      }
        else if (this.state.searchTerm.some(ing => ing === search)) {
          this.setState({
            alreadyEnteredIng: true,
            keywordValid: true
          });  
        }
       else {
        this.setState({
          keywordValid: false,
        });
      }
    }
      catch(err){
      console.log(err.message);
      }
    
  }
  addSearch() {
    this.getKeywordValid();
    this.setState({
      searchVal: "",
      SearchRes: true
    });
  }

  deleteIng(value) {
    var array = Array.from(this.state.searchTerm);
    var index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ searchTerm: array });
    }
  }
  async returnRecipe() {
    try {
      let recipes = await this.props.fetchRecipes(this.state.searchTerm);
      // console.log("searchRes", recipes.recipes.data.length);
      
      if (recipes.recipes.data.length !== 0) {
        (this.setState({
          SearchRes: true
        }))
      }
      
    } catch (err) {
      console.log(err.message);
    }
  }

  handleSubmit() {
    // this.returnRecipe();
    this.props.fetchRecipes(this.state.searchTerm).then(() =>
    this.setState({
      searchTerm: []
    })
    );
  }

  render() {
    this.props.closeModal();

    return (
      <div>
        <div className="searchbackground"></div>
        <div className="searchcontent">

          <form className="searchform">
            <div className="errors">
              {!this.state.keywordValid ? (
                <p>Sorry! This ingredient is not found. Try "cheese"!</p>
              ) : null}
              {this.state.alreadyEnteredIng && this.state.keywordValid ? (
                <p> This ingredient has already been entered.</p>
              ) : null}
            </div>
            
            <div className="searchbar">
              <FontAwesomeIcon icon={faSearch} />
              <input
                id="search"
                type="text"
                onChange={this.update("searchVal")}
                placeholder="Add Ingredients" required
                value={this.state.searchVal}
              />

              <div onClick={this.addSearch} className="searchadd">
                +
              </div>
            </div>
          </form>

          <div className="searchTerms">
            <ul>
              {this.state.searchTerm
                ? this.state.searchTerm.map((ing, id) => (
                    <li key={`term-${id}`}>
                      {ing}
                      <span onClick={() => this.deleteIng(ing)}>
                        <FontAwesomeIcon icon={faMinusCircle} />
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>

          <button onClick={this.handleSubmit} className="searchbutton">
            Show Me Recipes!
          </button>

          <div className="recipes">
            <ul>
              {this.props.match.path !== "/" ? this.props.recipes.map((recipe, idx) => (
                  <div className="searched_recipe_items" key={`recipe-${idx}`}>
                    <Link to={`/${recipe._id}`}>
                      <img src={recipe.image_url} className="recipeimg" alt="recipe" />
                    </Link>
                    <div className="recipeinfo">
                      <h1>{recipe.name}</h1>
                      {recipe.keywords.map((ing, id) => (
                      <li key={id}>{ing}</li>
                      ))}
                      <button>Save</button>
                    </div>
                  </div>
                ))
              : null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
