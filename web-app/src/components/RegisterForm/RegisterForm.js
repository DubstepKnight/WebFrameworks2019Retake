import React, {useState} from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';
import { AppToaster } from '../../components/exporter';
import { Card, InputGroup, H3, Switch, Button, FormGroup, Checkbox } from '@blueprintjs/core';

export default function RegisterForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    console.log('isTeacher: ', isTeacher);

    const RegisterSubmit = () => {
        // console.log("first check");
        if( password !== passwordCheck) {
            // console.log(form.passwordCheck);
            // console.log(form.password);
            AppToaster.show({message: 'Passwords are different', intent: 'danger'});
        } else {
           SendAxiosRequest();
        }
    }

    const SendAxiosRequest = () => {
        setIsLoading(true);
        const form = {
            username: username,
            password: password,
            passwordCheck: passwordCheck,
            isTeacher: isTeacher
        }
        console.log('form: ', form);
        axios.post(`${process.env.REACT_APP_API_URI}v1/users/register`, {...form} ).then(res => {
            if ( res.data.errors ) {
                AppToaster.show({message: 'Something wrong has happened during your register', intent: 'danger'});
            } else {
                AppToaster.show({message: 'You have succussfully registered, congrats!', intent: 'success'});
            }
            console.log('form: ', form);
            setIsLoading(false);
        }).catch(err => {
            AppToaster.show({message: 'Something wrong has happened during your register', intent: 'danger'});
            console.log(err);
            setIsLoading(false);
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
                                    onChange={(event) => setUsername(event.currentTarget.value)} 
                                    value={username} 
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
                                    onChange={(event) => setPassword(event.currentTarget.value)} 
                                    value={password} 
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
                                    onChange={(event) => setPasswordCheck(event.currentTarget.value)}  
                                    value={passwordCheck} 
                                    type="password" 
                                    placeholder="Your password again"/>
                    </FormGroup>
                    <Switch onChange={() => setIsTeacher(!isTeacher)}
                            label="teacher ?"
                            id="isTeacher"
                            style={{height: '20px'}}
                            checked={isTeacher}
                            />
                    <Button type="submit" 
                            className={styles.RegisterButton} 
                            intent="success"
                            fill
                            large
                            loading={isLoading}
                            text="Register"
                            onClick={RegisterSubmit} />
                </div>
            </Card>     
        </>
    )
}
