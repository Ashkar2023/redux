import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
// import { uniqueId } from "lodash";

/**
 * Slice for managing todos.
 *
 * @typedef {Object} Todo - single todo in todos array
 * @property {string} createdAt - The creation date of the todo.
 * @property {boolean} completed - Indicates whether the todo is completed or not.
 * @property {string} value - The value of the todo.
 * @property {string} priority - The priority of the todo.
 */

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
    },
    reducers: {
        addToDo: (state, action) => {
            const { createdAt, value, priority } = action.payload;
            if (createdAt && value && priority) {
                const todo = {
                    // key:uniqueId(),
                    id: uuidv4(),
                    value,
                    priority,
                    createdAt
                };

                state.todos.push(todo);
            } else {
                console.error("Invalid To-Do. Missing properties");
            }
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    }
});

export const { addToDo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;