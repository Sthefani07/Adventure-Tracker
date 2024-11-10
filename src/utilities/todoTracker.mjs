import ACTIONS from "./todoTrackerActions.mjs";


export default function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: state.todos.length + 1,
                        desc: action.payload,
                        complete: false
                    }
                ]
            };

        case ACTIONS.SET_FORM_DATA:
            return {
                ...state,
                formData: { ...state.formData, desc: action.payload } // Update formData with new description
            };

        case ACTIONS.DELETE_ITEM:
            return {
                ...state,
                todos: state.todos.filter(d => d.id !== action.payload) // Correctly filters out the item
            };

        case ACTIONS.RESET_FORM:
            return {
                ...state,
                formData: { desc: '', complete: false } // Resets form data after submission
            };

        case ACTIONS.TOGGLE_COMPLETE:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, complete: !todo.complete } : todo
                )
            };

        case ACTIONS.EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, desc: action.payload.desc } : todo
                )
            };

        default:
            return state;
    }
}