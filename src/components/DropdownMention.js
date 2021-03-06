import React, { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'

import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        margin: theme.spacing(2),
        height: theme.spacing(4),
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

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query)
    const parts = parse(suggestion.name, matches)

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                <span key={part.text} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                </span>
                ))}
            </div>
        </MenuItem>
    )
}

const callBackendAPI = async (query) => {
    const response = await fetch(`http://localhost:8080/mentions/${query}`)
    const data = await response.json()

    if (response.status !== 200) {
        throw Error(data.message) 
    }
    return data;
}

export default function DropdownMention(props) {
    const classes = useStyles()
    const [text, setText] = useState('')
    const [currentMention, setCurrentMention] = useState('')
    const [currentMentionPositionInit, setCurrentMentionPositionInit] = useState(-1)
    const [currentMentionPositionEnd, setCurrentMentionPositionEnd] = useState(-1)
    const [isMentioning, setIsMentioning] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        setText('')
    }, [props.emptyInput])

    const handleChange = () => (event, { newValue }) => {
        setText(newValue)
    }

    const handleKey = () => (event) => {
        const isArroba = (event.which === 64)
        const isEmtySpace = (event.which === 32)

        if (isArroba) {
            setCurrentMentionPositionInit(event.target.selectionStart)
            setCurrentMentionPositionEnd(event.target.selectionStart + 1)
            setIsMentioning(true)
        } else if (isEmtySpace) {
            setCurrentMentionPositionEnd(event.target.selectionStart)
            setIsMentioning(false)
        } else {
            setCurrentMentionPositionEnd(currentMentionPositionEnd + 1)
        }
    }

    const onSuggestionsFetchRequested = ({ value }) => {
        const mentionTarget = value.substring(currentMentionPositionInit, currentMentionPositionEnd)
        const mention = mentionTarget.startsWith('@') ? mentionTarget.substr(1) : ''

        if (isMentioning && mention) {
            setCurrentMention(mention)
            callBackendAPI(mention)
                .then(response => {
                    setSuggestions(response.data.query.allusers)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([])
    }

    const addSuggestionToText = (event, { suggestionValue }) => {
        event.preventDefault()
        setText(text.replace(currentMention, suggestionValue))
    }

    const getSuggestionValue = (suggestion) => suggestion.name

    const autosuggestProps = {
        renderInputComponent: props.inputText,
        suggestions,
        onSuggestionsFetchRequested,
        onSuggestionsClearRequested,
        onSuggestionSelected: addSuggestionToText,
        focusInputOnSuggestionClick: false,
        getSuggestionValue,
        renderSuggestion,
    }

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest',
                    label: 'Add a post',
                    placeholder: 'To mention type @',
                    value: text,
                    onChange: handleChange(),
                    onKeyPress: handleKey()
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

