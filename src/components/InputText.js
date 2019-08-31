import React from 'react'
import TextField from '@material-ui/core/TextField'

const InputText = ({ classes, inputRef = () => {}, ref, ...other }) => {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node)
                    inputRef(node)
                },
                classes: {
                input: classes.input,
                },
            }}
            {...other}
        />
    )
}

export default InputText