import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import { Footer } from '../../components/exporter'
import { H1, UL } from "@blueprintjs/core";

export default function LandingPage() {
    return (
        <div className={styles.Wrapper}>
        <div className={styles.LandingPage}>
            <div className={styles.Greetings}>
                {/* <h2 className={styles.Greater}> Test or be tested </h2> */}
                <H1 className={styles.Greeter}> <Link className={styles.DashboardLink} to="/dashboard"> Test </Link>  yourself <br></br> and <br></br> others </H1>
            </div>
            {/* <Footer /> */}
        </div>
        </div>
    )
}
