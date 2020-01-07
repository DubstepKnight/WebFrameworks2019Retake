import React from 'react';
import styles from './LandingPage.module.css';
import { Footer } from '../exporter'
import { H1, UL } from "@blueprintjs/core";

export default function LandingPage() {
    return (
        <div className={styles.Wrapper}>
        <div className={styles.LandingPage}>
            <div className={styles.Greetings}>
                {/* <h2 className={styles.Greater}> Test or be tested </h2> */}
                <H1 className={styles.Greeter}> Test yourself <br></br> and <br></br> others </H1>
            </div>
            <section className={styles.ForTeachers}>
                <div className={styles.Description}>
                    <H1> Build tests </H1>
                    <UL>
                        <li> Random questions by their category </li>
                        <li> static tests </li>
                    </UL>
                </div>
                <div className={styles.AnimatedExample}>
                    TO BE ADDED SOON
                </div>
            </section>
            <section className={styles.ForStudents}>    
                <div className={styles.Description}>
                    <H1> Build tests </H1>
                    <UL>
                        <li> Random questions by their category </li>
                        <li> static tests </li>
                    </UL>
                </div>
                <div className={styles.AnimatedExample}>
                    TO BE ADDED SOON
                </div>
            </section>
            <div className={styles.Analytics}>
                <div className={styles.HeadingAnalytics}>

                </div>
                <div className={styles.Graphs}>
                    <div className={styles.StudentsGraph}>

                    </div>
                    <div className={styles.TeachersGraph}>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </div>
    )
}
