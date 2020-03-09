import React from "react";
import { Link } from "react-router-dom";
import "./search_page.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchKeyword } from "../../actions/keyword_actions";
import background from "./background_video.mp4";
import keywords from "./keywords.json";


class SearchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: [],
            searchVal: "",
            keywordValid: true,
            alreadyEnteredIng: false,
            SearchRes: false,
            note: false,
            help: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.addSearch = this.addSearch.bind(this);
        this.deleteIng = this.deleteIng.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.props.fetchRecipes(this.state.searchTerm);
        this.triggerHelp = this.triggerHelp.bind(this);
    }

    componentDidMount() {
        this.props.getSavedRecipes(this.props.currentUser);
    }

    update(field) {
        let keyValues = keywords.map(obj => obj.name);
        if (this.state.searchVal === "" && document.getElementById("search-suggestions")) {
            document.getElementById("search-suggestions").innerHTML = `<div class="suggestions">Suggestions: cheese, egg, or tomato</div>`;
        }
        return e => {
            let suggestions = [...new Set(keyValues.filter(name => name.includes(e.target.value.toLowerCase())))].splice(0, 7);
            let suggDiv = document.getElementById("search-suggestions")
            if (suggestions.length === 0) {
                suggDiv.innerHTML = `<div class="suggestions">Suggestions: No ingredients found`;
            }else {
                suggDiv.innerHTML = `<div class="suggestions">Suggestions: `
                suggestions.map((term, i) => {
                    if (suggestions.length === 0) {
                        suggDiv.innerHTML = `<div class="suggestions">Suggestions: No ingredients found`
                    }else if (i !== suggestions.length - 1) {
                        suggDiv.children[0].innerHTML += `${term}, `
                    }else if (suggestions.length !== 1){
                        suggDiv.children[0].innerHTML += `or ${term}`
                    }else {
                        suggDiv.children[0].innerHTML += `${term}`
                    }
                })
                suggDiv.innerHTML += `</div>`
            }
            this.setState({ [field]: e.target.value });
        };
    }

    triggerHelp() {
        this.setState({help: !this.state.help})
    }

    async getKeywordValid() {
        try {
            let search = this.state.searchVal.toLowerCase();
            let res = await fetchKeyword(this.state.searchVal);

            if (res.data && !this.state.searchTerm.some(ing => ing === search)) {
                this.setState({
                    searchTerm: [...this.state.searchTerm, search],
                    keywordValid: true,
                    alreadyEnteredIng: false
                });
            } else if (this.state.searchTerm.some(ing => ing === search)) {
                this.setState({
                    alreadyEnteredIng: true,
                    keywordValid: true
                });
            } else {
                this.setState({
                    keywordValid: false
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    addSearch() {
        this.getKeywordValid();
        this.setState({
            searchVal: "",
            SearchRes: true
        });
        document.getElementById("search").value = "";
        this.update("searchVal");
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

            if (recipes.recipes.data.length !== 0) {
                this.setState({
                    SearchRes: true
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    handleSubmit() {
        if (this.state.searchTerm.length === 0) {
            document.getElementById("no-ingredients").style.display = "block";
            setTimeout(function () {
                document.getElementById("no-ingredients").style.display = "none";
            }, 2000);            
        } else {
            this.props.fetchRecipes(this.state.searchTerm).then(res => {
                if (res.recipes.data.length === 0) {
                    document.getElementById("no-recipes").style.display = "block";
                    setTimeout(function () {
                        document.getElementById("no-recipes").style.display = "none";
                    }, 5000);
                }
                this.setState({
                    searchTerm: []
                })
            }
            )
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

    showErrors() {
        document.getElementById("errors").style.display = "block";
        setTimeout(function () {
            document.getElementById("errors").style.display = "none";
        }, 1000);
    }

    render() {
        this.props.closeModal();
        return (
            <div>
                <video autoPlay muted loop className="background_video">
                    <source src={background} type="video/mp4" />
                </video>
                <div id="note">Recipe Saved Successfully</div>
                <div id="no-ingredients">Please add ingredients before searching for recipes &#128512;</div>
                <div id="no-recipes">Sorry, no recipes match all the ingredients.<br/> Try with fewer ingredients.</div>
                {
                 this.state.help ? <div onClick={this.triggerHelp} id="howto">
                    Welcome to ingredish where you can search recipes by ingredients! <br/><br/>
                    Search an ingredient and add each ingredient by clicking +. Then click 'Show me Recipes!' to look for recipes that include the added ingredeints. <br/><br/>
                    You can also save recipes and add them to favorites by clicking 'save'. <br/><br/>
                    Bon Appétit!
                        <div className="close">&times;</div>
                    </div> :
                 null
                }
                
                <div className="searchcontent">

                    <form className="searchform">
                        <div className="errors">
                            {!this.state.keywordValid ? (
                                <p id="errors">Sorry! This ingredient is not found. Try "cheese", "egg", or "tomato"!</p>
                            ) : null}
                            {this.state.alreadyEnteredIng && this.state.keywordValid ? (
                                <p id="errors"> This ingredient has already been entered.</p>
                            ) : null}
                        </div>

                        <div className="searchbar">
                            <FontAwesomeIcon icon={faSearch} />
                            <input
                                id="search"
                                type="text"
                                onChange={this.update("searchVal")}
                                placeholder="Add Ingredients"
                                required
                                value={this.state.searchVal.toLowerCase()}
                            />
                            <div onClick={this.addSearch} className="searchadd">+</div>
                        </div>
                    </form>
                    <div id="search-suggestions"></div>
                    <div onClick={this.triggerHelp} className="click-help">Not sure what to do? Click here</div>
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

                    <div onClick={this.handleSubmit} className="searchbutton">Show Me Recipes!</div>

                    <div className="recipes">
                        <ul>
                            {this.props.match.path !== "/"
                                ? this.props.recipes.map((recipe, idx) => (
                                    <div className="searched_recipe_items" key={`recipe-${idx}`}>
                                        <Link className="recipeImg" to={`/recipe/${recipe._id}`}>
                                            <img
                                                src={recipe.image_url}
                                                className="recipeimg"
                                                alt="recipe"
                                            />
                                        </Link>

                                        <div className="recipeinfo">
                                            <Link className="recipe-info-link" to={`/recipe/${recipe._id}`}>
                                                <h1>{recipe.name}</h1>
                                                {recipe.keywords.map((ing, id) => (
                                                    <li key={id}>{ing}</li>
                                                ))}
                                            </Link>
                                                <button
                                                    id={recipe.id}
                                                    type="button"
                                                    onClick={() => this.saveRecipe(recipe._id)}>{this.props.savedRecipes.includes(recipe._id) ? "Saved" : "Save" }
                                                </button>
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
