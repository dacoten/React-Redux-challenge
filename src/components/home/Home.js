import React from 'react';
import Emails from '../email/Emails';
import SearchEmail from '../email/SearchEmail';
import Language from '../language/Language';

function Home() {
    return (
        <div className="home">
            <div className="header">
                <SearchEmail />
                <Language />
            </div>
            <Emails />
        </div>
    )
}

export default Home;