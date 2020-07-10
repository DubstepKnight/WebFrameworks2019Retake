import React from 'react';
import {TestInputField} from './TestInputField/TestInputField';

export const TestInputFields = (props) => {
    
    console.log(props);

    return (
        <div>
            {props.fields.map((question, index) => (
                <>
                    <TestInputField register={props.register} 
                                    id={index} 
                                    control={props.control}
                                    defaultValue={question}
                                    append={props.append} 
                                    remove={props.remove} /> 
                    {/* <Button onClick={() => props.remove(index)}
                            minimal
                            intent="primary"
                            icon="minus"
                            className={styles.RemoveButton} /> */}
                </>
            ))}
        </div>
    )
}
