import React, { useState, useRef, useEffect } from 'react';

import DropdownMention from './components/DropdownMention'
import TextField from '@material-ui/core/TextField'

import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import './App.css'

const useStyles = makeStyles(theme => ({
  fab: {
      //margin: theme.spacing(1),
      position: 'absolute',
      top: 0,
      right: 0,
  },
}))

function App() {
  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const [emptyInput, setEmptyInput] = useState(true)
  const inputEl = useRef()

  useEffect(() => {
    setEmptyInput(true)
  })

  const addPost = (event) => {
    event.preventDefault()

    const newValue = inputEl.current.value
    if (newValue.length > 0) {
      setPosts([...posts, newValue])
      setEmptyInput(false)
    }
  }

  const InputText = ({ classes, inputRef = () => {}, ref, ...other }) => {
      return (
          <TextField
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
      <form onSubmit={addPost}>
        <DropdownMention inputText={InputText} emptyInput={emptyInput}/>
        <Fab
          color="primary" 
          aria-label="add" 
          className={classes.fab}
          type="submit"
        >
            <AddIcon />
        </Fab>
      </form>
    
    </div>
  );
}

export default App;
