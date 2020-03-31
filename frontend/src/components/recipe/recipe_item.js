import React from 'react';
import './recipe_item.scss';
import showBg from '../../images/cuttingboard.jpeg'

class RecipeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Beef Bulgogi",
            ingredients: [
                "1 pound flank steak, thinly sliced",
                "5 tablespoons soy sauce",
                "2 1/2 tablespoons white sugar",
                "1/4 cup chopped green onion",
                "2 tablespoons minced garlic",
                "2 tablespoons sesame seeds",
                "2 tablespoons sesame oil",
                "1/2 teaspoon ground black pepper"
            ],
            keywords: ["beef"],
            directions: {
                1: "Place the beef in a shallow dish. Combine soy sauce, sugar, green onion, garlic, sesame seeds, sesame oil, and ground black pepper in a small bowl. Pour over beef. Cover and refrigerate for at least 1 hour or overnight.",
                2: "Preheat an outdoor grill for high heat, and lightly oil the grate.",
                3: "Quickly grill beef on hot grill until slightly charred and cooked through, 1 to 2 minutes per side."
            },
            image_url:
                "https://images.media-allrecipes.com/userphotos/720x405/1254483.jpg",
            nutrition_facts:
                "232 calories; 13.2 g fat; 12.4 g carbohydrates; 16.2 g protein; 27 mg cholesterol; 1157 mg sodium."
        };
    }
    render() {
        return (
            <div className="recipe-item">
                <img src={showBg} className="show-bg" alt="bg_img" />
                <div className="recipe-left"></div>
                <div className="recipe-center">
                    <div></div>
                    <div>
                        <img className="recipe-img" src={this.state.image_url} width="100%" alt="recipe_img" />
                        <div className="recipe-name">{this.state.name}</div>
                        <div className="recipe-nutrition">{this.state.nutrition_facts}</div>
                        <div className="ingredients">Ingredients</div>
                        <div className="recipe-ingredients">{this.state.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>
                        ))}</div>
                        <div className="directions">Directions</div>
                        <div className="recipe-directions">
                            {Object.keys(this.state.directions).map((key, i) => (
                                <li key={key}>{`${key}: ${this.state.directions[key]}`}</li>
                            ))}
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="recipe-inner"></div>
            </div>
        );
    }
}

export default RecipeItem;