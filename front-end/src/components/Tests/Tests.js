import React from 'react';
import styles from './Tests.module.css';
import { HTMLTable } from '@blueprintjs/core';
import Test from './Test/Test';

export default function Tests(props) {

    const user = {
        isTeacher: true
    }

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

    // testData.map(test => console.log(test));

    // const some = testData.filter(test => {
        // (test.testName.toLowerCase().includes(props.filterValue.toLowerCase()))).map()
    // }

    // console.log(some);

    const Filter = () => {
        
        // testData.testName.toLowerCase().includes(filter.toLowerCase)
    }

    return (
        <div className={styles.Tests}>
            <HTMLTable  className={styles.TestsTable} >
                <thead className={styles.TableHead}>
                    <tr> 
                        <th> Test name </th>
                        <th> Subject </th>
                        <th> Category </th>
                        <th> Teacher </th>
                        <th> Points </th>
                        {user.isTeacher === true ? <th> Edit </th> : <th> Take </th>} 
                        {/* <th>  </th> */}
                        {user.isTeacher === true ? <th> Delete </th> : null}
                        <th> Created At </th>
                        <th> Due Date </th>
                    </tr>
                </thead>
                <tbody className={styles.TableBody}>
                    {testData.filter(test => 
                        (test.testName.toLowerCase().includes(props.filterValue.toLowerCase()))).map(item => {
                            return <Test {...item} />
                        })
                    }
                </tbody>
            </HTMLTable>

        </div>
    )
}
