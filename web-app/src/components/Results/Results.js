import React, { useEffect, useState } from 'react';
import styles from "./Results.module.css";
import { HTMLTable, Spinner } from '@blueprintjs/core';
import { ResultRow } from './ResultRow/ResultRow';
import { AppToaster } from '../../components/exporter';
import axios from 'axios';

export const Results = (props) => {

    console.log('props: ', props);

    const [tests, setTests] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:5001/v1/users/history", {
            headers: {
                "Authorization": `Bearer ${props.userInfo.token}`
            }
        }).then(res => {
            setIsLoading(false);
            console.log(res.data);
            if ( res.data.errors ) {
                AppToaster.show({message: 'Could not load tests', intent: 'danger'});
            } else {
                setTests(res.data);
            }
        }).catch(error => {
            setIsLoading(false);
            console.log(error);
            AppToaster.show({message: 'Could not load tests', intent: 'danger'});
        }) 
    }, [])

    return (
        <div className={styles.Tests}>
            {
                isLoading ? <Spinner intent='primary' size={50} /> : 
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
                        {props.exams.filter(tests => 
                            (tests.name.toLowerCase().includes(props.filterValue.toLowerCase()))).map(item => {
                                return <ResultRow {...item} {...props} />
                            })}
                    </tbody>
                </HTMLTable>
            }
        </div>
    )
}
