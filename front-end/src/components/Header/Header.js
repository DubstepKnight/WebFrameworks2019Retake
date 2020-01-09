import React, {useState, useEffect} from 'react';
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
    Overlay
} from "@blueprintjs/core";
import styles from './Header.module.css';
// import { LOG_IN } from '@blueprintjs/icons/lib/esm/generated/iconContents';

// console

export default function Header(props) {

    const [navBarClassName, setClassName] = useState(styles.TransparentNavbar)

    useEffect(() =>  window.addEventListener('scroll', (e) => {
        if (window.scrollY > window.innerHeight - window.innerHeight / 1.5 ) {
            // this.setState({nav: styles.navScrolled});
            setClassName(styles.ColoredNavbar)
            console.log(navBarClassName);
        } else {
            setClassName(styles.TransparentNavbar)
            console.log(navBarClassName);
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
    }





    return (
        <>
            <Navbar fixedToTop  className={navBarClassName}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading className={styles.Logo}> Testy </Navbar.Heading>
                </Navbar.Group>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button intent={Intent.PRIMARY} onClick={loginOverlayer} minimal icon="log-in" text="Login" />
                    <Overlay isOpen={isLoginOpen} 
                            autoFocus={true} 
                            canOutsideClickClose={true} 
                            hasBackdrop={true} 
                            onClose={loginOverlayer}
                            usePortal={true}
                            > 
                                <LoginForm />
                    </Overlay>
                    <Button minimal onClick={registerOverlayer} icon="log-in" text="Register" />
                    <Overlay isOpen={isRegisterOpen} 
                            autoFocus={true} 
                            enforceFocus={true}
                            canOutsideClickClose={true} 
                            hasBackdrop={true} 
                            onClose={registerOverlayer}
                            usePortal={true}
                            > 
                                <RegisterForm />
                    </Overlay>
                </NavbarGroup>
            </Navbar>
        </>
    )
}
