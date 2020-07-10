import styles from './ToasterShower.module.css';
import { Toaster, Position } from '@blueprintjs/core';

export default function ToasterShower(props) {

    Toaster.create({
        position: Position.TOP,
        className: styles.Toaster
    })

    return (
        Toaster.show({
            message: props.message,
            intent: props.intent,
            icon: props.icon
        })
    )
}
