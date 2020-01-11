import React from 'react';
import styles from './LoginForm.module.css';
import { Card, InputGroup, H3, Switch, Button } from '@blueprintjs/core';

export default function LoginForm() {
    return (
        <>
            <Card className={styles.LoginForm}>
                <H3>Login</H3>
                <div className={styles.InputFields}>
                    <InputGroup large type="text" placeholder=" Your username"/>
                    <InputGroup large type="password" placeholder="Your password"/>
                    <Button type="submit"
                            intent="success"
                            className={styles.Login}
                            fill
                            large 
                            text="Login" />
                    {/* <Switch label="rememberMe" /> */}
                    {/* <label id="rememberMe"> Remember me </label> */}
                </div>
            </Card>     
        </>
    )
}
