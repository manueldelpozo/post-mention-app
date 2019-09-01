import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import PostItem from './PostItem'

const useStyles = makeStyles(theme => ({
    root: {
        listStyle: 'none'
    },
}))

export default function PostList({ posts }) {
    const classes = useStyles()
    const [sortedByLatestList, setSortedByLatestList] = useState([])

    useEffect(() => {
        setSortedByLatestList(posts.sort((a,b) => (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0)))
    }, [posts])

    return (
        <ul className={classes.root}>
            {
                sortedByLatestList.map((post, i) => 
                    <PostItem key={i} text={post.text} timestamp={post.timestamp} />
                )
            }
        </ul>
    )
}