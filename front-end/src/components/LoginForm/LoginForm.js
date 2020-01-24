import React, { useState } from 'react';
import axios from 'axios';
import styles from './LoginForm.module.css';
import { Card, InputGroup, H3, Switch, Button } from '@blueprintjs/core';

export default function LoginForm(props) {

    console.log(props.userInfoAndToken);

    const [form, setUserInfo] = useState({
        username: "",
        password: "",
        rememberMe: false
    })

    const setUserInfoHandler = event => {
        // console.log(event.target.value);
        // console.log(event.target.name);
        
        console.log(form);
        
        setUserInfo({
            ...form,
            [event.target.name]: ( event.target.name === "rememberMe" ? !form.rememberMe : event.target.value)
        })
    }

    // const setRememberMe = () => {
    //     console.log("Remember changed!");
    //     // setState(prevState => ({
    //     //     rememberMe: !prevState.rememberMe
    //     // }));
    //     setUserInfo(!form.rememberMe);
    //     console.log(form);
    // }

    const FormSubmitter = () => {
        if (!form.password || !form.username) {
            console.log(!form.username || !form.password);
            console.log("There is either no password or no username");
        } else {
            console.log("oWo");
            SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        console.log(form);
        axios.post('http://localhost:5001/v1/users/login', {...form} ).then(res => {
            console.log(res);
            let token = res.data.userAndToken.token;
            let userInfo = res.data.userAndToken.user[0];
            // let rememberMe = 
            props.loginHandler(userInfo, token, form.rememberMe);
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
                    <Switch value={form.rememberMe} onChange={setUserInfoHandler} name="rememberMe" label="Remember me ?" />
                    {/* <label id="rememberMe"> Remember me </label> */}
                    <Button type="submit"
                            intent="success"
                            className={styles.Login}
                            fill
                            large 
                            text="Login"
                            onClick={FormSubmitter} />
                </div>
            </Card>     
        </>
    )
}
