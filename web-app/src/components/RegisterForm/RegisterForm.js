import React, {useState} from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';
import { AppToaster } from '../../components/exporter';
import { Card, InputGroup, H3, Switch, Button, FormGroup } from '@blueprintjs/core';

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
        } else {
           SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        axios.post('http://localhost:5001/v1/users/register', {...form} ).then(res => {
            if ( res.data.errors ) {
                AppToaster.show({message: 'Something wrong has happened during your register', intent: 'danger'});
            } else {
                AppToaster.show({message: 'You have succussfully registered, congrats!', intent: 'success'});
            }
            console.log(res);
        }).catch(err => {
            AppToaster.show({message: 'Something wrong has happened during your register', intent: 'danger'});
            console.log(err);
            return null;
        })
    }

    return (
        <>
            <Card className={styles.RegisterForm}>
                <H3 className={styles.Title}>Register</H3>
                <div className={styles.InputFields}>
                    <FormGroup
                        label="Username"
                        labelFor="username"
                    >
                        <InputGroup name="username" 
                                    large 
                                    id='username'
                                    onChange={setUserInfoHandler} 
                                    value={form.username} 
                                    type="text" 
                                    placeholder=" Your email"/>
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="password"
                    >
                        <InputGroup name="password" 
                                    large 
                                    id='password'
                                    onChange={setUserInfoHandler} 
                                    value={form.password} 
                                    type="password" 
                                    placeholder="Your password"/>
                    </FormGroup>
                    <FormGroup
                        label="Password check"
                        labelFor="passwordCheck"
                    >
                        <InputGroup name="passwordCheck" 
                                    large 
                                    id='passwordCheck'
                                    onChange={setUserInfoHandler} 
                                    value={form.passwordCheck} 
                                    type="password" 
                                    placeholder="Your password again"/>
                    </FormGroup>
                    <Switch onClick={setUserInfoHandler} 
                            label="teacher ?"
                            style={{height: '20px'}}
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
