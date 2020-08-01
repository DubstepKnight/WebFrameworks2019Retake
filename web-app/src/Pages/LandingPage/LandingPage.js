import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { LoginForm, RegisterForm } from '../../components/exporter'
import { H1, H3, Button, Dialog } from "@blueprintjs/core";
import floatingGrade from './Grades.gif'

export default function LandingPage(props) {

    console.log('props: ', props);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    if ( props.userInfoAndToken.token ) {
        props.history.push('/dashboard');
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.LandingPage}>
                <section className={styles.Greetings}>
                    <div className={styles['left-block']} >
                        <H1 className={styles.Greeter}> Test  yourself </H1>
                        <H3>  and others </H3>
                        <div className={styles['buttons']} >
                            <Button text='Login' 
                                    intent='primary' 
                                    onClick={() => setIsLoginOpen(true)} />
                            <Dialog isOpen={isLoginOpen} 
                                    className={styles['dialog']}
                                    onClose={() => setIsLoginOpen(false) } >
                                <LoginForm userInfoAndToken={props.userInfoAndToken} loginHandler={props.loginHandler} />
                            </Dialog>
                            <Button text='Register' 
                                    outlined 
                                    style={{ marginLeft: '50px' }}
                                    onClick={() => setIsRegisterOpen(true)} />
                            <Dialog isOpen={isRegisterOpen}
                                    className={styles['dialog']}
                                    onClose={() => setIsRegisterOpen(false) } >
                                <RegisterForm userInfoAndToken={props.userInfoAndToken} />
                            </Dialog>
                        </div>
                    </div>
                    <img src={floatingGrade} className={styles['floating-grade']} />
                </section>
                <section className={`${styles['benefit-sections']} ${styles['second-section']}`} >
                    <div>
                        <h3> Great teaching experience </h3>
                        <ul>
                            <li> <strong> Randomised exams </strong> - increase the security of your exam by introducing question randomisation </li>
                            <li> <strong> Public exams </strong> - exams available for everyone. Do not limit your students! </li>
                            <li> <strong> Private exams </strong> - create an exam for specific students. Make it as unique as it can get </li>
                        </ul>
                    </div>
                    <img src='#' className={styles['']} />
                </section>
                <section className={`${styles['benefit-sections']} ${styles['third-section']}`} >
                    {/**
                     * TODO Add copy for students benefit section
                     * Also, come up with a better idea for landing page layout!
                     */}
                    <img src='#' className={styles['']} />
                    <div>
                        <h3> Test your abilities </h3>
                        <ul>
                            <li> <strong> Randomised exams </strong> - increase the security of your exam by introducing question randomisation </li>
                            <li> <strong> Public exams </strong> - exams available for everyone. Do not limit your students! </li>
                            <li> <strong> Private exams </strong> - create an exam for specific students. Make it as unique as it can get </li>
                        </ul>
                    </div>
                </section>
                <section className={`${styles['benefit-sections']} ${styles['fourth-section']}`} >

                </section>
            </div>
        </div>
    )
}
