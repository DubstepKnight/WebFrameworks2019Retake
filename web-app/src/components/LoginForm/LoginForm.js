import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppToaster } from '../../components/exporter';
import axios from 'axios';
import styles from './LoginForm.module.css';
import { Card, InputGroup, H3, Switch, Button, FormGroup } from '@blueprintjs/core';

export default function LoginForm(props) {

    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false)

    const [form, setUserInfo] = useState({
        username: "",
        password: "",
        rememberMe: false
    })

    const setUserInfoHandler = event => {
        // console.log(form);
        
        setUserInfo({
            ...form,
            [event.target.name]: ( event.target.name === "rememberMe" ? !form.rememberMe : event.target.value)
        })
    }

    const FormSubmitter = () => {
        if (!form.password || !form.username) {
            // console.log(!form.username || !form.password);
            AppToaster.show({message: 'Check your password and username', intent: 'danger'});
            // console.log("There is either no password or no username");
        } else {
            // console.log("oWo");
            SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        console.log(form);
        setIsLoading(true);
        axios.post(`${process.env.REACT_APP_API_URI}v1/users/login`, {...form} ).then(res => {
            // console.log(res);
            let token = res.data.userAndToken.token;
            let userInfo = res.data.userAndToken.user[0];
            if ( res.data.errors ) {
                AppToaster.show({message: 'Something wrong has happened', intent: 'danger'});
            } else {
                AppToaster.show({message: 'You are logged in', intent: 'success'});
                props.loginHandler(userInfo, token, form.rememberMe);
                history.push("dashboard");
                // console.log("sent");
            }
            setIsLoading(false);
        }).catch(err => {
            AppToaster.show({message: 'Something wrong has happened', intent: 'danger'});
            setIsLoading(false);
            // console.log(err);
            // console.log("some");
            return null;
        })
    }

    return (
        <>
            <Card className={styles.LoginForm}>
                <H3>Login</H3>
                <div className={styles.InputFields}>
                    <FormGroup
                        label="Username"
                        labelFor="username"
                    >
                        <InputGroup name="username" 
                                    id='username' 
                                    value={form.username} 
                                    onChange={setUserInfoHandler} 
                                    large 
                                    type="text" 
                                    placeholder=" Your email"/>
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="password"
                    >
                        <InputGroup name="password" 
                                    id='password'
                                    value={form.password} 
                                    onChange={setUserInfoHandler} 
                                    large 
                                    type="password" 
                                    placeholder="Your password"/>
                    </FormGroup>
                    <Switch value={form.rememberMe} onChange={setUserInfoHandler} name="rememberMe" label="Remember me ?" />
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
