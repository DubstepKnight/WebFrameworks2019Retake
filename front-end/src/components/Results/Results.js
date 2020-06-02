import React from 'react';
import styles from "./Results.module.css";
import { HTMLTable } from '@blueprintjs/core';
import { ResultRow } from './ResultRow/ResultRow';
// import axios from 'axios';

export const Results = (props) => {

    console.log('props: ', props);

    return (
        <div className={styles.Tests}>
            <HTMLTable  className={styles.TestsTable} 
                        striped
                        interactive >
                <thead className={styles.TableHead}>
                    <tr> 
                        <th> Test name </th>
                        <th> Category </th>
                        <th> Maximum points </th>
                        {props.userInfo.userInfo.isTeacher === true ? <th> View </th> : <th> Take </th>} 
                        {/* <th> Created At </th> */}
                    </tr>
                </thead>
                <tbody className={styles.TableBody}>
                    {props.exams.filter(test => 
                        (test.name.toLowerCase().includes(props.filterValue.toLowerCase()))).map(item => {
                            return <ResultRow {...item} {...props} />
                        })}
                </tbody>
            </HTMLTable>

        </div>
    )
}
