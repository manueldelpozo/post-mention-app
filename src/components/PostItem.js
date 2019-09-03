import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Message from '@material-ui/icons/Message'

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(3),
        display: 'flex',
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(2),
        padding: theme.spacing(2),
    },
    divider: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}))

export default function PostItem({ text, timestamp }) {
    const classes = useStyles()
    const [datetime, setDateTime] = useState('')

    useEffect(() => {
        setDateTime(parseToDateTime(timestamp))
    }, [timestamp])

    const parseToDateTime = (timestamp) => {
        const addZero = (number) => {
            return (String(number).length === 1 ? '0' : '') + number
        }
        const dateObj = new Date(timestamp)
        const date = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
        const time = `${addZero(dateObj.getHours())}:${addZero(dateObj.getMinutes())}:${addZero(dateObj.getSeconds())}`
        return `${date} ${time}`
    }

    const highlightMentions = (text) => {
        return text.split(' ').map(word => word.startsWith('@') ? `<mark>${word}</mark>` : word).join(' ')
    }

    return (
        <li className={classes.root}>
            <Message />
            <Paper className={classes.paper}>
                <Typography variant="caption" color="textSecondary">
                    {datetime}
                </Typography>
                <Divider className={classes.divider} orientation="vertical" />
                <div dangerouslySetInnerHTML={{__html: highlightMentions(text)}} />
            </Paper>
        </li>
    )
}