import React from 'react';
import styles from './Tests.module.css';
import { HTMLTable } from '@blueprintjs/core';
import Test from './TestRow/TestRow';

export default function TestsTable(props) {

    console.log(props);

    console.log(props.userInfo.isTeacher);

    const Filter = () => {
        
        // testData.testName.toLowerCase().includes(filter.toLowerCase)
    }

    return (
        <div className={styles.Tests}>
            <HTMLTable  className={styles.TestsTable} 
                        striped
                        interactive >
                <thead className={styles.TableHead}>
                    <tr> 
                        <th> Test name </th>
                        <th> Category </th>
                        <th> # of questions </th>
                        {props.userInfo.userInfo.isTeacher === true ? <th> View </th> : <th> Take </th>} 
                        {props.userInfo.userInfo.isTeacher === true ? <th> Delete </th> : null}
                        <th> Created At </th>
                    </tr>
                </thead>
                <tbody className={styles.TableBody}>
                    {props.exams.filter(test => 
                        (test.name.toLowerCase().includes(props.filterValue.toLowerCase()))).map(item => {
                            return <Test {...item} {...props} />
                        })}
                </tbody>
            </HTMLTable>

        </div>
    )
}
