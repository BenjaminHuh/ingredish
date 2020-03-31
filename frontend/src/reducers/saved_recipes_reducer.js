export default function (state = {}, action) {
    Object.freeze(state);
    let newState = {};

    switch (action.type) {

        case "RECEIVE_SAVED_RECIPES":
            action.recipes.data.forEach(recipe => {
                newState[recipe._id] = recipe;
            });
            return newState;

        default:
            return state;
    }
}

