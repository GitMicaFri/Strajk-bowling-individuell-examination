import './Top.scss';
import React from 'react';

import logo from '../../assets/strajk-logo.svg';

function Top({ title }) {
    return (
        <header className='top'>
            <img src={ logo } alt="Strajk logo" className="top__logo" />
            <h1 className="top__title">{ title }</h1>
        </header>
    )
}

export default Top;