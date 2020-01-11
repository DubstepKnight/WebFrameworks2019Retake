import React, {useState} from 'react';
import axios from 'axios';
import styles from './RegisterForm.module.css';
import { ToasterShower} from '../exporter';
import { Card, InputGroup, H3, Switch, Button, Toast, Position, Toaster } from '@blueprintjs/core';

export default function RegisterForm() {

    const [username, usernameStateSetter] = useState("");
    const [password, passwordStateSetter] = useState("");
    const [passwordCheck, passwordCheckStateSetter] = useState("");
    const [isTeacher, isTeacherStateSetter] = useState(false); 

    const usernameStateSetterHandler = event => {
        let uName = event.currentTarget.value;
        usernameStateSetter(uName);
        console.log(username);
    }

    const passwordStateSetterHandler = event => {
        let pWord = event.currentTarget.value;
        passwordStateSetter(pWord);
        console.log(password);
    }

    const passwordCheckStateSetterHandler = event => {
        let pWordCheck = event.currentTarget.value;
        passwordCheckStateSetter(pWordCheck);
        console.log(passwordCheck);
    }

    const isTeacherStateSetterHandler = event => {
        // let isTeacher = event.currentTarget.value;
        isTeacherStateSetter(!isTeacher);
        console.log(isTeacher);
    }

    const RegisterSubmit = () => {
        console.log("first check");
        if( password !== passwordCheck) {
            console.log(passwordCheck);
            console.log(password);
            // return(
                
            // ) 
        } else {
            let userInfo = {
                username,
                password,
                isTeacher
            }
            axios.post('http://localhost:5001/v1/users', {...userInfo} ).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
                return null;
            })
        }
    }

    // const ToasterShower = () => {
    //     console.log("works");

    // }
    // const ToastMessageHandler = () => {
    //     if ( passwordCheck !== password ) {
    //         <ToasterShower message="Passowords do not match!" intent="danger" />
    //     } else if ( !password) {
    //         <ToasterShower message="No password!" intent="danger" />
    //     }
    // }
    
    

    return (
        <>
            {/* <ToasterShower message="text" intent="danger" icon="tick" /> */}
            {/* {ToastMessageHandler} */}
            <Card className={styles.RegisterForm}>
                <H3 className={styles.Title}>Register</H3>
                <div className={styles.InputFields}>
                    <InputGroup large onChange={usernameStateSetterHandler} value={username} type="text" placeholder=" Your username"/>
                    <InputGroup large onChange={passwordStateSetterHandler} value={password} type="password" placeholder="Your password"/>
                    <InputGroup large onChange={passwordCheckStateSetterHandler} value={passwordCheck} type="password" placeholder="Your password again"/>
                    <Switch onClick={isTeacherStateSetterHandler} 
                            label="teacher ?" />
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
