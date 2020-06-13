import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
//import { Context } from '../store/appContext';
import './App.css';

function App() {

    //const {store, actions} = useContext(Context);

    const [state, setState] = useState({
        username: '',
        password: '',
        avatar: '',
        pais: '',
    })

    useEffect(() => {
        // componentDidMount
        cargarDataInicial();
        getCharacters("https://rickandmortyapi.com/api/character");
    }, [])

    const cargarDataInicial = () => {
        setState({
            ...state,
            username: 'admin@example.com',
            password: 'admin',
            pais: 'venezuela',
            characters: null,
        })
    }

    const getCharacters = url => {
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                setState({
                    ...state,
                    characters: data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const guardarValor = e => {
        if (e.target.type === "file") {
            console.log("Es un archivo");
            setState({
                ...state,
                [e.target.name]: e.target.files
            })
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <br />
            </header>
            <main>

                <form onSubmit={e => e.preventDefault()}>
                    <input type="email" name="username" value={state.username} onChange={(e) => {
                        guardarValor(e);
                    }} placeholder="Username" /> <br />
                    <input type="password" name="password" value={state.password} onChange={(e) => {
                        guardarValor(e);
                    }} placeholder="Password" /> <br />
                    <select name="pais" value={state.pais} onChange={e => {
                        guardarValor(e)
                    }}>
                        <option value="">SELECCIONE</option>
                        <option value="chile">CHILE</option>
                        <option value="venezuela">VENEZUELA</option>
                    </select><br />
                    <input type="file" name="avatar" onChange={(e) => {
                        guardarValor(e);
                    }} /> <br />
                </form>
                {state.input}

                <ul>
                    {
                        !!state.characters &&
                        state.characters.results.map((person) => {
                            return <li>{person.name}</li>
                        })
                    }
                </ul>
                {/* <ul>
                    {
                        !!store.characters &&
                        store.characters.results.map((person) => {
                            return <li>{person.name}</li>
                        })
                    }
                </ul> */}
            </main>
        </div>
    );
}

export default App;
