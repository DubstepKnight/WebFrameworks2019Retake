import React, {useState, useEffect} from 'react';
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
} from "@blueprintjs/core";
import styles from './Header.module.css';

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



    return (
        <>
            <Navbar fixedToTop  className={navBarClassName}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading className={styles.Logo}> Testy </Navbar.Heading>
                </Navbar.Group>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button intent={Intent.PRIMARY} minimal icon="log-in" text="Login" />
                    <Button minimal icon="log-in" text="Register" />
                </NavbarGroup>
            </Navbar>
        </>
    )
}
