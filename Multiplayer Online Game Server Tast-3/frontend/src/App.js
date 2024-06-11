import React, { useState } from 'react';
import Auth from './components/Auth';
import Game from './components/Game';
import './App.css';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <div className="App">
            {token ? <Game token={token} /> : <Auth setToken={setToken} />}
        </div>
    );
};

export default App;
