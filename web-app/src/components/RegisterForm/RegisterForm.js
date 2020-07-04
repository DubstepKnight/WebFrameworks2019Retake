import React, {useState} from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';
import { ToasterShower} from '../exporter';
import { Card, InputGroup, H3, Switch, Button, Toast, Position, Toaster } from '@blueprintjs/core';

export default function RegisterForm() {

    const [form, setUserInfo] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        isTeacher: false
    })

    const setUserInfoHandler = event => {
        console.log(event.target.name, event.target.value);
        setUserInfo({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const RegisterSubmit = () => {
        console.log("first check");
        if( form.password !== form.passwordCheck) {
            console.log(form.passwordCheck);
            console.log(form.password);
            // return(
                
            // ) 
        } else {
           SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        axios.post('http://localhost:5001/v1/users/register', {...form} ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            return null;
        })
    }

    return (
        <>
            <Card className={styles.RegisterForm}>
                <H3 className={styles.Title}>Register</H3>
                <div className={styles.InputFields}>
                    <InputGroup name="username" large onChange={setUserInfoHandler} value={form.username} type="text" placeholder=" Your email"/>
                    <InputGroup name="password" large onChange={setUserInfoHandler} value={form.password} type="password" placeholder="Your password"/>
                    <InputGroup name="passwordCheck" large onChange={setUserInfoHandler} value={form.passwordCheck} type="password" placeholder="Your password again"/>
                    <Switch onClick={setUserInfoHandler} 
                            label="teacher ?"
                            value={form.isTeacher} />
                    <Button type="submit" 
                            className={styles.RegisterButton} 
                            intent="success"
                            fill
                            large
                            text="Register"
                            onClick={RegisterSubmit} />
                </div>
            </Card>     
        </>
    )
}
