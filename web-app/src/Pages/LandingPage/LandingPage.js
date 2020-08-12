import React, { useState } from 'react';
import styles from './LandingPage.module.css';
import { LoginForm, RegisterForm } from '../../components/exporter'
import { H1, H3, Button, Dialog } from "@blueprintjs/core";
import floatingGrade from './Grades.gif'
import teacherIllustration from './Teacher-bro.svg';
import studentsIllustration from './TrackAndField-bro.svg';

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
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
                        <h2 style={{textAlign: 'start'}} > Great teaching experience </h2>
                        <ul style={{paddingLeft: 0}} >
                            <li className={styles['one-benefit-left']} > <strong> Randomised exams </strong> - increase the security of your exam by introducing question randomisation </li>
                            <li className={styles['one-benefit-left']} > <strong> Public exams </strong> - exams available for everyone. Do not limit your students! </li>
                            <li className={styles['one-benefit-left']} > <strong> Private exams </strong> - create an exam for specific students. Make it as unique as it can get </li>
                        </ul>
                    </div>
                    <img src={teacherIllustration} className={styles['illustration']} />
                </section>
                <section className={`${styles['benefit-sections']} ${styles['third-section']}`} >
                    <img src={studentsIllustration} className={styles['illustration']} />
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
                        <h2 style={{textAlign: 'end'}} > Test your abilities </h2>
                        <ul>
                            <li className={styles['one-benefit-right']} > <strong> Randomised exams </strong> - increase the security of your exam by introducing question randomisation </li>
                            <li className={styles['one-benefit-right']} > <strong> Public exams </strong> - exams available for everyone. Do not limit your students! </li>
                            <li className={styles['one-benefit-right']} > <strong> Private exams </strong> - create an exam for specific students. Make it as unique as it can get </li>
                        </ul>
                    </div>
                </section>
                <section className={`${styles['benefit-sections']} ${styles['fourth-section']}`} >

                </section>
            </div>
        </div>
    )
}
