import React from "react";
import {  withRouter } from 'react-router-dom';
import showBg from "../../images/cuttingboard.jpeg";

class RecipeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            recipe: this.props.getRecipe(this.props.match.params.recipeId),
            // commentsToggle: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }
    componentDidMount() {
        this.props.getSavedRecipes(this.props.currentUser);
    }

    update(field) {
        return e =>
            this.setState({
                [field]: e.target.value
            });
    }

    async getComments() {
        try {
            let recipe = await this.props.addComment(
                this.props.recipeId,
                this.state.comment
            );
            this.setState({ recipe: recipe });
        } catch (err) {
            console.log(err.message);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.getComments();
        this.setState({
            comment: "",
            commentsToggle: false
        });
    }

    saveRecipe(recipeId) {
        this.props.saveRecipe(this.props.currentUser, recipeId);
    }

    render() {
        const { recipe } = this.props;
        return (
            <div>
                {recipe ? (
                    <div className="recipe-item">
                        <img src={showBg} className="show-bg" alt="bg-img" />
                        <div className="recipe-left"></div>
                        <div className="recipe-center">
                            <div></div>
                            <div>
                                <img
                                    className="recipe-img"
                                    src={recipe.image_url}
                                    width="100%"
                                    alt="recipe-img"
                                />
                                <div className="recipe-name_save">
                                    <div className="recipe-name">{recipe.name}</div>
                                    <div
                                        className="recipe-save"
                                        id={recipe.id}
                                        onClick={() => this.saveRecipe(recipe._id)}>{this.props.savedRecipes.includes(recipe._id) ? "Favorite" : "Save" }
                                    </div>
                                </div>
                                <div className="recipe-nutrition">
                                    {recipe.nutrition_facts}
                                </div>
                                <div className="ingredients">Ingredients</div>
                                <div className="recipe-ingredients">
                                    {recipe.ingredients.map((ing, i) => (
                                        <li key={i}>{ing}</li>
                                    ))}
                                </div>
                                <div className="directions">Directions</div>
                                <div className="recipe-directions">
                                    {Object.keys(recipe.directions).map((key, i) => (
                                        <li
                                            key={`dir-${key}`}
                                        >{`${key}: ${recipe.directions[key]}`}</li>
                                    ))}
                                </div>
                                <br />
                                <br />

                                <div className="comments-box">
                                    <h1 className="comments">Comments</h1>
                                    <h2>For your honest opinions, we keep the comments anonymous!</h2>
                                    {this.state.commentsToggle ? (
                                        <ul>
                                            {recipe.comments.length !== 0
                                                ? recipe.comments.map((comment, id) => (
                                                    <li key={`comments-${id}`}>* {comment}</li>
                                                ))
                                                : null}
                                        </ul>
                                    ) : (
                                            <ul>
                                                {this.props.recipe
                                                    ? this.props.recipe.comments.map((comment, id) => (
                                                        <li key={`comments-${id}`}>* {comment}</li>
                                                    ))
                                                    : null}
                                            </ul>
                                        )}
                                    <form onSubmit={this.handleSubmit}>
                                        <label className="comment-text" htmlFor="">Your comment:
                                                <input
                                                className="comment-input"
                                                type="textarea"
                                                value={this.state.comment}
                                                placeholder="Leave a comment"
                                                onChange={this.update("comment")}
                                                required/>
                                        </label>
                                        <button className="comment-button" type="submit">+</button>
                                    </form>
                                </div>

                                <div className="backtosearch-box">
                                    <nav className="backtosearch">
                                         <div  
                                            onClick={()=>this.props.history.goBack() }>
                                            Back to Search Results
                                        </div>
                                    </nav>
                                </div>
                                
                            </div>
                            <div></div>
                        </div>
                        <div className="recipe-inner"></div>
                    </div>
                ) : (
                        ""
                    )}
            </div>
        );
    }
}


export default withRouter(RecipeDetail);
