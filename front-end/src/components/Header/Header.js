import React from 'react';
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
} from "@blueprintjs/core";
import styles from './Header.module.css';

export default function Header(props) {
    return (
        <div>
            <Navbar>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>Blueprint</Navbar.Heading>
                    <Navbar.Divider />
                    <Button className="bp3-minimal" icon="home" text="Home" />
                    <Button className="bp3-minimal" icon="document" text="Files" />
                </Navbar.Group>
            </Navbar>
        </div>
    )
}
