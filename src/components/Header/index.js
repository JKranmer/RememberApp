import React from 'react';

export default function Header(props){
    return (
        <header>
            <h2 className={props.class}>{props.title}</h2>
        </header>
    );
}
