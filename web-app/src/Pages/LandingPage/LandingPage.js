import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { Footer, LoginForm, RegisterForm } from '../../components/exporter'
import { H1, H3, Button, Dialog } from "@blueprintjs/core";

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
                <div className={styles.Greetings}>
                    <H1 className={styles.Greeter}> <Link className={styles.DashboardLink} to="/dashboard"> Test </Link>  yourself </H1>
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
                <Footer />
            </div>
        </div>
    )
}
