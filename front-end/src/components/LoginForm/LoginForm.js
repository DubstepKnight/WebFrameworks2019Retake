import React from 'react';
import styles from './LoginForm.module.css';
import { Card, InputGroup, H3, Switch } from '@blueprintjs/core';

export default function LoginForm() {
    return (
        <>
            <Card className={styles.LoginForm}>
                <H3>Login</H3>
                <div className={styles.InputFields}>
                    <InputGroup type="text" placeholder=" Your username"/>
                    <InputGroup type="password" placeholder="Your password"/>
                    <Switch tagName="rememberMe" />
                    <label id="rememberMe"> Remember me </label>
                </div>
            </Card>     
        </>
    )
}
