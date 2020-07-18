import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TodosContext from '../../../../state/todo/Context';
import * as todosActions from '../../../../state/todo/action';

import styles from './TodoCreator.module.css';



const TodoCreator = () => {
    const { dispatchToTodos } = useContext(TodosContext);
    

    const {getFieldProps, errors, handleSubmit} = useFormik({
        initialValues: {
            title: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: yup.object({
            title: yup.string()
            .required('Você precisa preencher este campo')
        }),
        onSubmit: (values, formikBag) => {
            dispatchToTodos(todosActions.addTodo(values.title));
            formikBag.setFieldValue('title', '', false)
        }
    })
    return (
        <form className={styles.container} onSubmit = {handleSubmit}>
            <input className = {styles.input}
             type='text'
             placeholder = 'Nova Tarefa'
             autoComplete = 'off'
             autoFocus
              { ...getFieldProps('title') }
              />
              { errors.title ? (
                  <small className={ styles.error }>{errors.title}</small>
              ) : null }
            <button className= { styles.submit } type='submit'>Adicionar Tarefa</button>
        </form>
    )
}

export default TodoCreator;