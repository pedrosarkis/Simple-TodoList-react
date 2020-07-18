import React, { useState, useCallback, useEffect} from 'react';
import {ReactComponent as UpdateTitleIcon} from '../../../../../../assets/icons/update-title-icon.svg';
import {ReactComponent as DeleteIcon} from '../../../../../../assets/icons/delete-todo-icon.svg';
import styles from './TodoItem.module.css';


const TodoItem = ( {id, title, onDelete, completed, onStatusUpdate, onModalOpen}) => {
    const [isChecked, setChecked] = useState(completed);
    const handleChange = useCallback((evt)=> {
        setChecked(evt.target.checked)
    })

    const handleModalOpen = useCallback(()=>{
        onModalOpen(id);
    }, [onModalOpen, id])

    useEffect(()=> {
        onStatusUpdate(id, isChecked)
    }, [onStatusUpdate, id, isChecked])
    return (
        <li className={styles.item}>
             <span className={completed ? styles.completed : null}> { title }</span>
            <div className={styles.controlButtons}>
                <button onClick={handleModalOpen}>
                     <UpdateTitleIcon/>
                      </button>
                <input type='checkbox' checked={isChecked} onChange ={handleChange} />
                <button onClick= {()=> {onDelete(id)}}><DeleteIcon/></button>
            </div>
        </li>
    )
}

export default TodoItem;