import React from 'react';
import styles from './Tests.module.css';
import Test from './Test/Test';

export default function Tests() {


    const testData = [
        {
            testName: "You",
            teacher: "Mr Cock",
            points: 80,
            take: true,
            delete: false,
            createdAt: "10/05/2015",
            dueDate: "20/02/2020"
        },
        {
            testName: "You",
            teacher: "Mr Cock",
            points: 80,
            take: true,
            delete: false,
            createdAt: "10/05/2015",
            dueDate: "20/02/2020"
        },
        {
            testName: "You",
            teacher: "Mr Cock",
            points: 80,
            take: true,
            delete: false,
            createdAt: "10/05/2015",
            dueDate: "20/02/2020"
        } 
    ]

    return (
        <div className={styles.Tests}>
            <tr>
                <th>
                    <th> Test name </th>
                    <th> Teacher </th>
                    <th> Points </th>
                    <th> Take </th>
                    <th> Delete </th>
                    <th> Created At </th>
                    <th> Due Date </th>
                </th>
            </tr>
            {/* {testData.map(test => <Test {...test} />)} */}
        </div>
    )
}
