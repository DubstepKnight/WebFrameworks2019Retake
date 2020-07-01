import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HistoryRow from './HistoryRow/HistoryRow';
import { HTMLTable } from '@blueprintjs/core';
import styles from './History.module.css';

export default function History(props) {

    console.log('props: ', props);

    const [tests, setTests] = useState();

    useEffect(() => {
        axios.get("http://localhost:5001/v1/users/history", {
            headers: {
                "Authorization": `Bearer ${props.userInfo.token}`
            }
        }).then(res => {
            console.log('res.data: ', res.data);
            let flags = [], output = [], l = res.data.length, i;
            for( i = 0; i < l; i++) {
                if ( flags[res.data[i].examName] ) continue;
                flags[res.data[i].examName] = true;
                output.push(res.data[i]);
            }
            setTests(output);
            console.log('output: ', output);
        }).catch(error => {
            console.log(error)
        }) 
    }, [])

    return (
        <div className={styles.Tests}>
            <HTMLTable className={styles.TestsTable} 
                       striped
                       interactive >
                <thead className={styles.TableHead}>
                    <tr> 
                        <th> Test name </th>
                        {/* <th> Category </th> */}
                        <th> View </th>
                    </tr>
                </thead>
                <tbody className={styles.TableBody}>
                    { tests && tests.filter(test => 
                        (test.examName.toLowerCase().includes(props.filterValue.toLowerCase()))).map(item => {
                            return <HistoryRow {...item} {...props} />
                        })}
                </tbody>
            </HTMLTable>
    </div>
    )
}
