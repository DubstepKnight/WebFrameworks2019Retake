import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';
import { Card, InputGroup, H3, Switch, Button } from '@blueprintjs/core';

export default function LoginForm() {

    const [form, setUserInfo] = useState({
        email: "",
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
        if (!form.password || !form.email) {
            console.log(!form.email || !form.password);
            console.log("UwU");
        } else {
            console.log("oWo");
            SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        axios.get('http://localhost:5001/v1/users', {...form} ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            return null;
        })
    }

    return (
        <>
            <Card className={styles.LoginForm}>
                <H3>Login</H3>
                <div className={styles.InputFields}>
                    <InputGroup name="email" value={form.email} onChange={setUserInfoHandler} large type="text" placeholder=" Your email"/>
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
