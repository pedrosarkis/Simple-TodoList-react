import React from 'react';
import TodoApp from '../../../../TodoApp';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from './TodoModal.module.css';
import {ReactComponent as CloseIcon} from '../../../../../../assets/icons/delete-todo-icon.svg';

const TodoModal = ({onModalClose, onTitleUpdate, id, findTitle}) => {
    const {getFieldProps, errors, handleSubmit, isValid} = useFormik({
        initialValues: {
            title: findTitle(id),
        },
        validateOnBlur: false,
        validateOnChange:false,
        validationSchema: yup.object({
            title: yup.string()
            .required('Você precisa preencher este campo')
        }),
        onSubmit: (values, formikBag) => {
            onTitleUpdate(id, values.title)
            formikBag.setFieldValue('title', '', false)
            onModalClose();
        }
    })
    return (
        <>
        <div className={styles.backdrop} onClick={onModalClose}/>
            <div className={styles.modal}>
                <form onSubmit = {handleSubmit}>
                    <button className={styles.closeModal} onClick={onModalClose}><CloseIcon/></button>
                    <input
                    className = {styles.input}
                    type='text'
                    placeholder = 'Nova Tarefa'
                    autoComplete = 'off'
                    { ...getFieldProps('title') }
                    />
                    {errors.title ? (
                        <small className={styles.error}>{errors.title}</small>
                    ) : null }
                    <button className={styles.submit} type='submit'>Atualizar Tarefa</button>
                </form>
            </div>
        </>
    )
}

export default TodoModal;