import React, { useEffect } from 'react';
import styles from "./Results.module.css";
import { HTMLTable } from '@blueprintjs/core';
import { ResultRow } from './ResultRow/ResultRow';
import axios from 'axios';

export const Results = (props) => {

    console.log('props: ', props);

    useEffect(() => {
        axios.get("http://localhost:5001/v1/users/history", {
            headers: {
                "Authorization": `Bearer ${props.userInfo.token}`
            }
        }).then(res => {
            console.log(res.data);
            // setQuestions(res.data);
        }).catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <div className={styles.Tests}>
            <HTMLTable  className={styles.TestsTable} 
                        striped
                        interactive >
                <thead className={styles.TableHead}>
                    <tr> 
                        <th> Test name </th>
                        <th> Category </th>
                        <th> View </th>
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
