import React from 'react';
import styles from './Test.module.css';

export default function Test(props) {
    return (
        // <div>
            <tr>
                <td> {props.testName} </td>
                <td> {props.teacher} </td>
                <td> {props.points} </td>
                <td> {props.take} </td>
                <td> {props.delete} </td>
                <td> {props.createdAt} </td>
                <td> {props.dueDate} </td>
            </tr>
        // </div>
    )
}
