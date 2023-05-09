import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state,action) => {
        state.todos.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state.todos));

    },
    removeTodo:(state,action)=>{
        state.todos = state.todos.filter((item)=>item.title !== action.payload)
        localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    checkTodo:(state,action)=>{
        state.todos = state.todos.map((item) => {
            if(item.title === action.payload.title){
                return {
                  ...item,
                  checked: !action.payload.checked,
                };
            }else{return item}
        
        });
        localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo:(state,action)=>{
        // state.todos = state.todos.map((item)=>)
    }

  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeTodo, updateTodo, checkTodo } = todoSlice.actions;

export default todoSlice.reducer;
