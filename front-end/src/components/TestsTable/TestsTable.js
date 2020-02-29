import React from 'react';
import styles from './Tests.module.css';
import { HTMLTable } from '@blueprintjs/core';
import Test from './TestRow/TestRow';

export default function TestsTable(props) {

    console.log(props);

    const testData = [
        {
            testName: "You",
            subject: "physics",
            category: "mechanics",
            teacher: "Mr Cock",
            points: 80,
            take: true,
            delete: false,
            createdAt: "10/05/2015",
            dueDate: "20/02/2020"
        },
        {
            testName: "Me",
            subject: "Information technology",
            category: "Artificial intelligence",
            teacher: "Dr Tea",
            points: 200,
            take: true,
            delete: false,
            createdAt: "10/05/2015",
            dueDate: "20/02/2020"
        },
        {
            testName: "Them",
            subject: "physics",
            category: "thermodynamic",
            teacher: "Mrs Dom",
            points: 100,
            take: true,
            delete: false,
            createdAt: "10/05/2015",
            dueDate: "20/02/2020"
        } 
    ]

    console.log(props.userInfo.isTeacher);

    const Filter = () => {
        
        // testData.testName.toLowerCase().includes(filter.toLowerCase)
    }

    return (
        <div className={styles.Tests}>
            <HTMLTable  className={styles.TestsTable} >
                <thead className={styles.TableHead}>
                    <tr> 
                        <th> Test name </th>
                        <th> Category </th>
                        <th> Maximum points </th>
                        {props.userInfo.userInfo.isTeacher === true ? <th> Edit </th> : <th> Take </th>} 
                        {props.userInfo.userInfo.isTeacher === true ? <th> Delete </th> : null}
                        <th> Created At </th>
                    </tr>
                </thead>
                <tbody className={styles.TableBody}>
                    {props.exams.filter(test => 
                        (test.name.toLowerCase().includes(props.filterValue.toLowerCase()))).map(item => {
                            return <Test {...item} userInfo={props.userInfo} />
                        })
                    }
                </tbody>
            </HTMLTable>

        </div>
    )
}
