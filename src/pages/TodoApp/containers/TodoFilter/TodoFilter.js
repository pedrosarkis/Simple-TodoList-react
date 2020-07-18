import React, {useContext, useCallback, useState, useEffect} from 'react';
import FilterContext from '../../../../state/filter/Context';
import * as filterActions from '../../../../state/filter/actions';
import styles from './TodoFilter.module.css';
import TodoSelect from './TodoSelect/TodoSelect';

const TodoFilter = () => {
    const {filter, dispatchToFilter} = useContext(FilterContext);
    const [selectValue, setSelectValue] = useState(filter);

    const updateFilter = useCallback((filter)=> {
        dispatchToFilter(filterActions.toggleFilter(filter));
    }, [dispatchToFilter])

    useEffect(()=>{
        updateFilter(selectValue);
    }, [selectValue, updateFilter])

    const handleOptionChange = useCallback((evt)=>{
        setSelectValue(evt.target.value);
    },[]); 
    return (
        <div className={styles.container}>
            <TodoSelect
                 value={selectValue}
                 onOptionChanged={handleOptionChange}
                 options={[
                     {value: 'all', title: 'Todas as tarefas'},
                     {value: 'active', title: 'Tarefas a se fazer'},
                     {value: 'completed', title: 'Tarefas Concluídas'}
                    ]}
                    onFilterUpdate={updateFilter}
                 />
        </div>
    )
}

export default TodoFilter;