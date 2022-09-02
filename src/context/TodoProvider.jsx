import React, { useReducer, useCallback, useState } from 'react';

import { TodoContext } from './Context';

const initTodo = {
  todos: [],
  todoEdit: {},
  totalTodos: 0,
};

const todosReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_TODO':
      const allTodos = action.payload.todos;
      const totalTodos = action.payload.total;
      return {
        ...state,
        todos: allTodos,
        total: totalTodos,
      };
    case 'ADD_TODO':
      const addedTodos = [action.payload, ...state.todos];

      return {
        ...state,
        todos: addedTodos,
      };
    case 'UPDATE_TODO':
      const existingTodoItemIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      const existingTodoItem = state.todos[existingTodoItemIndex];

      let updatedTodos = null;

      if (existingTodoItem) {
        updatedTodos = [...state.todos];
        updatedTodos[existingTodoItemIndex] = action.payload;
      }
      return {
        ...state,
        todos: updatedTodos,
      };
    case 'REMOVE_TODO':
      const removedTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );

      return {
        ...state,
        todos: removedTodo,
      };
    case 'EDIT_TODO':
      const editTodo = { ...action.payload };

      return {
        ...state,
        todoEdit: editTodo,
      };

    default:
      return initTodo;
  }
};

const TodoProvider = ({ children }) => {
  const [todoState, dispatchTodo] = useReducer(todosReducer, initTodo);
  const [addTodoSuccess, setAddTodoSuccess] = useState({
    isSuccess: false,
    successMessage: '',
  });

  const getAllTodoHandler = useCallback((todosItems) => {
    dispatchTodo({ type: 'INIT_TODO', payload: todosItems });
  }, []);

  const addTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'ADD_TODO', payload: todoItem?.data });
    setAddTodoSuccess({
      isSuccess: todoItem?.status,
      successMessage: todoItem?.message,
    });
  };

  const updateTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'UPDATE_TODO', payload: todoItem });
  };

  const deleteTodoHandler = (todoId) => {
    dispatchTodo({ type: 'REMOVE_TODO', payload: todoId });
  };

  const editTodoHandler = (todoItem) => {
    dispatchTodo({ type: 'EDIT_TODO', payload: todoItem });
  };

  const value = {
    todos: todoState.todos,
    todoEdit: todoState.todoEdit,
    totalTodos: todoState.total,
    addTodoSuccess,
    setAddTodoSuccess,
    getAllTodo: getAllTodoHandler,
    addTodo: addTodoHandler,
    updateTodo: updateTodoHandler,
    deleteTodo: deleteTodoHandler,
    editTodo: editTodoHandler,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
