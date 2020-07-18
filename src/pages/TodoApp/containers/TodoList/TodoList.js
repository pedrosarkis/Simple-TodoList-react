import React, { useContext, useCallback, useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import TodosContext from '../../../../state/todo/Context';
import TodoItem from './components/TodoItem/TodoItem';
import * as todosActions from '../../../../state/todo/action';
import TodoModal from './components/TodoModal/TodoModal';
import FilterContext from '../../../../state/filter/Context';

const filteredList = (list, currentFilter) => {
    switch(currentFilter) {
        case 'all':
            return list;
        case 'active':
            return list.filter(todo => !todo.completed);
        case 'completed':
            return list.filter(todo => todo.completed)
        default:
            throw new Error();
    }
}

const TodoList = () => {
    const { todos, dispatchToTodos } = useContext(TodosContext);
    
    
    const handleDelete = useCallback((id)=> {
        dispatchToTodos(todosActions.removeTodo(id))
    }, [dispatchToTodos])

    const handleTitleUpdate = useCallback((id, title)=>{
           dispatchToTodos(todosActions.toggleTodoTitle(id, title)); 
    }, [dispatchToTodos]);    

    const handleModalOpen = useCallback((id)=>{
        setCurrentId(id);
    }, [])

    const handleModalClose = useCallback(()=> {
        setCurrentId(null);
    }, [])

    const [curId, setCurrentId] = useState(null);

    const handleStatusUpdate = useCallback((id, completed)=> {
        dispatchToTodos(todosActions.toggleTodoStatus(id, completed))
    }, [dispatchToTodos]);

    const getTitleById = useCallback((id) => {
        const curTodo = todos.find(el => el.id === id);
        return curTodo.title;
    }, [todos])

    const { filter } = useContext(FilterContext);
    
    return (
        <div className = {styles.container}> 
        <ul className= {styles.ul}> 
           {filteredList(todos, filter).map((todo) => {
               return  (
                  <TodoItem
                     key = {todo.id}
                     id = {todo.id}
                     title = {todo.title}
                     completed = {todo.completed}
                     onStatusUpdate = {handleStatusUpdate}
                     onDelete = {handleDelete}
                     onModalOpen = {handleModalOpen}
                     />
               )
           }) }
           </ul>
           {curId && (
           <TodoModal
                id={curId}
                findTitle = {getTitleById}
                onModalClose={handleModalClose}
                onTitleUpdate = {handleTitleUpdate}
             />
           )}
        </div>
    )
}

export default TodoList;