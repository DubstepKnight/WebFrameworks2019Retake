import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';
import { Card, InputGroup, H3, Switch, Button } from '@blueprintjs/core';

export default function LoginForm() {

    const [form, setUserInfo] = useState({
        username: "",
        password: ""
    })

    const setUserInfoHandler = event => {
        console.log(event.target.name);
        console.log(event.target.value);
        setUserInfo({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const FormSubmitter = () => {
        if (!form.password || !form.username) {
            console.log(!form.username || !form.password);
            console.log("UwU");
        } else {
            console.log("oWo");
            SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        console.log(form);
        axios.post('http://localhost:5001/v1/users/login', {...form} ).then(res => {
            console.log(res);
            console.log("sent");
        }).catch(err => {
            console.log(err);
            console.log("some");
            return null;
        })
    }

    return (
        <>
            <Card className={styles.LoginForm}>
                <H3>Login</H3>
                <div className={styles.InputFields}>
                    <InputGroup name="username" value={form.username} onChange={setUserInfoHandler} large type="text" placeholder=" Your email"/>
                    <InputGroup name="password" value={form.password} onChange={setUserInfoHandler} large type="password" placeholder="Your password"/>
                    <Button type="submit"
                            intent="success"
                            className={styles.Login}
                            fill
                            large 
                            text="Login"
                            onClick={FormSubmitter} />
                    {/* <Switch label="rememberMe" /> */}
                    {/* <label id="rememberMe"> Remember me </label> */}
                </div>
            </Card>     
        </>
    )
}
