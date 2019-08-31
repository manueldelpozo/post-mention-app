import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'

import InputText from './InputText'

import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

const suggestions = [{"name":"Rita","id":"118276"},{"name":"Rita .S123","id":"36910238"},{"name":"Rita 070749","id":"29219624"},{"name":"Rita 2210","id":"26194428"},{"name":"Rita 3883","id":"2075602"},{"name":"Rita 420 mpg","id":"30716040"},{"name":"Rita A. Yuliana","id":"36922429"},{"name":"Rita Abihail Mustafa Morel","id":"4967280"},{"name":"Rita Acharya","id":"28842594"},{"name":"Rita Ackermann","id":"38480826"}]

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.name, query)
    const parts = parse(suggestion.name, matches)

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                    {part.text}
                </span>
                ))}
            </div>
        </MenuItem>
    )
}


const fetchUsers = (query) => {
    // const url = `https://community.fandom.com/api.php?action=query&list=allusers&auprefix=${query}&format=json`;
    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
    // headers.append('Origin','http://localhost:3000');
    // try {
    //     const response = await fetch(url, {
    //         mode: 'no-cors',
    //         method: 'POST',
    //         headers: headers
    //     })
    //     return await response.json()
    // } catch (error) {
    //     return error.message;
    // }

    return suggestions
}

function getSuggestions(value) {
    return value.length === 0
        ? []
        // : fetchUsers(value).then(response => {
        //     return response
        // }).catch((error) => {
        //     console.error(error)
        // })
        : fetchUsers(value)
}

const useStyles = makeStyles(theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
}))

export default function DropdownMention() {
    const classes = useStyles()
    const [text, setText] = useState('')
    const [currentMention, setCurrentMention] = useState('')
    const [stateSuggestions, setSuggestions] = useState([])

    const handleSuggestionsFetchRequested = ({ value }) => {
        const suggestions = getSuggestions(currentMention)
        setSuggestions(suggestions)
    }

    const handleSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const addSuggestionToText = (event, { suggestionValue }) => {
        setText(text.replace(currentMention, suggestionValue))
    }

    const handleChange = () => (event, { newValue }) => {
        const lastWord = newValue.split(' ').slice(-1)[0]
        if (lastWord.startsWith('@')) {
            setCurrentMention(lastWord.substr(1))
        } else {
            setCurrentMention('') 
        }
        
        setText(newValue)
    }

    const shouldRenderSuggestions = (value) => {
        return currentMention.length > 0
    }

    const getSuggestionValue = (suggestion) => {
        return suggestion.name
    }

    const autosuggestProps = {
        renderInputComponent: InputText,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        onSuggestionSelected: addSuggestionToText,
        shouldRenderSuggestions,
        getSuggestionValue,
        renderSuggestion,
    }

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-simple',
                    label: 'Add a post',
                    placeholder: 'To mention type @',
                    value: text,
                    onChange: handleChange(),
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        </div>
    )
}

