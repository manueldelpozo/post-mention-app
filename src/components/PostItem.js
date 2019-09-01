import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Message from '@material-ui/icons/Message'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
    },
}))

export default function PostItem({ text, timestamp }) {
    const classes = useStyles()
    const [datetime, setDateTime] = useState('')

    useEffect(() => {
        setDateTime(parseToDateTime(timestamp))
    }, [timestamp])

    const parseToDateTime = (timestamp) => {
        const dateObj = new Date(timestamp)
        const date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
        const time = `${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
        return `${date} ${time}`
    }

    return (
        <li className={classes.root}>
            <Paper>
                <Typography component="label">
                    <Message />
                    {datetime}
                </Typography>
                <Typography component="p">
                    {text}
                </Typography>
            </Paper>
        </li>
    )
}