import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginForm, RegisterForm } from '../exporter';
import {
    Alignment,
    Button,
    Navbar,
    NavbarGroup,
    Dialog
} from "@blueprintjs/core";
// import { CSSTransition } from 'react-transition-group';
import styles from './Header.module.css';

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
        // console.log(isRegisterOpen);
    }

    const loginOverlayer = () => {
        loginStateChanger(!isLoginOpen);
        // console.log("yo!");
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
                            <Button intent="primary" 
                                    onClick={loginOverlayer} 
                                    text="Login" />
                            <Dialog    isOpen={isLoginOpen} 
                                        autoFocus={true} 
                                        transitionDuration={100}
                                        canOutsideClickClose={true} 
                                        hasBackdrop={true} 
                                        onClose={loginOverlayer}
                                        className={styles['dialog']}
                                        usePortal={true}
                                    > 
                                        <LoginForm userInfoAndToken={props.userInfoAndToken} loginHandler={props.loginHandler} />
                            </Dialog>
                            <Button onClick={registerOverlayer} 
                                    outlined 
                                    style={{marginLeft: '25px'}}
                                    text="Register" />
                            <Dialog    isOpen={isRegisterOpen} 
                                        autoFocus={true} 
                                        transitionDuration={100}
                                        canOutsideClickClose={true} 
                                        hasBackdrop={true} 
                                        onClose={registerOverlayer}
                                        className={styles['dialog']}
                                        usePortal={true}
                                    > 
                                        <RegisterForm userInfoAndToken={props.userInfoAndToken} />
                            </Dialog> 
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
