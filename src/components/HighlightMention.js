import React from "react";

export default function HightlightMention({ text }) {
    return (
        <div>
            { text.split(' ').map(word => word.startsWith('@') ? <mark>{word}</mark> : word) }
        </div>
    )
}