import React from "react";

export default function HightlightMention({ text }) {
    return (
        <div>
            { text.split(' ').map((word, i) => word.startsWith('@') ? <mark key={i}>{word + ' '}</mark> : word + ' ') }
        </div>
    )
}