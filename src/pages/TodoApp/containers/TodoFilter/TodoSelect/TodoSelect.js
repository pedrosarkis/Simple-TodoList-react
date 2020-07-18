import React from 'react';
import styles from './TodoSelect.module.css'

const TodoSelect = ({ value, onOptionChanged, options, handleFilterUpdate}) => {
    
    return (
        <select className={styles.select} value={value} onChange={onOptionChanged}>
           {options.map(option => {
               return <option key={option.value} value={option.value}>{option.title}</option>
           })
           }
        </select>
    )
}
export default TodoSelect;