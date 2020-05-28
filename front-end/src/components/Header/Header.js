import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom';
import { LoginForm, RegisterForm } from '../exporter';
import {
    Alignment,
    Button,
    Classes,
    H5,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    Switch,
    Intent,
    Overlay,
    Card,
    Toast,
    Toaster,
    Position
} from "@blueprintjs/core";
// import { CSSTransition } from 'react-transition-group';
import styles from './Header.module.css';
import axios from 'axios';

// console

export default function Header(props) {

    // axios.
    const history = useHistory();

    const [navBarClassName, setClassName] = useState(styles.TransparentNavbar)

    useEffect(() =>  window.addEventListener('scroll', (e) => {
        if (window.scrollY > window.innerHeight - window.innerHeight / 1.5 ) {
            setClassName(styles.ColoredNavbar)
        } else {
            setClassName(styles.TransparentNavbar)
        }
    }), []); 

    const [isLoginOpen, loginStateChanger] = useState(false);
    const [isRegisterOpen, registerStateChanger] = useState(false);
    

    const registerOverlayer = () => {
        registerStateChanger(!isRegisterOpen);
        console.log(isRegisterOpen);
    }

    const loginOverlayer = () => {
        loginStateChanger(!isLoginOpen);
        console.log("yo!");
    }

    const logOut = () => {
        props.logOutHandler();
        loginStateChanger(false);
        history.push("/");
    }

    return (
        <>
            <Navbar fixedToTop  className={navBarClassName}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading className={styles.Logo}> <Link to='/dashboard' className={styles.LogoLink}> Testy </Link>  </Navbar.Heading>
                </Navbar.Group>
                <NavbarGroup align={Alignment.RIGHT}>
                    { !props.userInfoAndToken.token ? (
                        <>
                            <Button intent="primary" onClick={loginOverlayer} minimal icon="log-in" text="Login" />
                                <Overlay    isOpen={isLoginOpen} 
                                            autoFocus={true} 
                                            transitionDuration={100}
                                            canOutsideClickClose={true} 
                                            hasBackdrop={true} 
                                            onClose={loginOverlayer}
                                            usePortal={true}
                                        // transitionName={}
                                        > 
                                            <LoginForm userInfoAndToken={props.userInfoAndToken} loginHandler={props.loginHandler} />
                                </Overlay>
                            <Button minimal onClick={registerOverlayer} icon="log-in" text="Register" />
                            <Overlay    isOpen={isRegisterOpen} 
                                        autoFocus={true} 
                                        transitionDuration={100}
                                        canOutsideClickClose={true} 
                                        hasBackdrop={true} 
                                        onClose={registerOverlayer}
                                        usePortal={true}
                                    > 
                                        <RegisterForm userInfoAndToken={props.userInfoAndToken} />
                            </Overlay> 
                        </>
                    ) : (
                        <>
                            <Button intent="danger" onClick={logOut} minimal icon="log-out" text="Logout" />
                        </>
                    ) }
                </NavbarGroup>
            </Navbar>
        </>
    )
}
