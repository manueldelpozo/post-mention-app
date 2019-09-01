import React, { useState, useRef, useEffect } from 'react';

import DropdownMention from './components/DropdownMention'
import PostList from './components/PostList'

import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

import './App.css'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
    position: 'absolute',
    top: 0,
    right: 0,
  },
  form: {
    minHeight: theme.spacing(8),
  }
}))

function App() {
  const classes = useStyles()
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem('posts')) || [])
  const [emptyInput, setEmptyInput] = useState(true)
  const inputEl = useRef()

  useEffect(() => {
    setEmptyInput(true)
    localStorage.setItem('posts', JSON.stringify(posts))
  }, [posts])

  const addPost = (event) => {
    event.preventDefault()

    const newValue = inputEl.current.value
    if (newValue.length > 0) {
      setPosts([...posts, {
        text: newValue,
        timestamp: Date.now()
      }])
      setEmptyInput(false)
    }
  }

  const InputText = ({ classes, inputRef = () => {}, ref, ...other }) => {
    return (
      <TextField
        className={classes.input}
        fullWidth
        InputProps={{
            inputRef: inputEl,
            classes: {
              input: classes.input,
            },
        }}
        {...other}
      />
    )
  }

  return (
    <div className="App">
      <form onSubmit={addPost} className={classes.form}>
        <DropdownMention inputText={InputText} emptyInput={emptyInput}/>
        <Fab
          color="primary" 
          aria-label="add" 
          className={classes.fab}
          size="small"
          type="submit"
        >
            <AddIcon />
        </Fab>
      </form>
      <PostList posts={posts} />
    </div>
  );
}

export default App;
