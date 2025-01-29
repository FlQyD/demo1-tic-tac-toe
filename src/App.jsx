import { useState, useEffect } from 'react'
import './App.css'
import Game from './components/Game/Game'
import Menu from './components/Menu/Menu.jsx'

function App() {
    const [menu, setMenu] = useState("visible")
    const [mode, setMode] = useState(null)
    const [winner, setWinner] = useState(0);

    useEffect(() => {
        if (winner === 0) return;
        setMenu("visible")
    }, [winner])
    

    return (
            <>
            {menu !== "close" ? <Menu setWinner={setWinner} winner={winner} setMode={setMode} setMenu={setMenu}/> : ""}
            <Game mode={mode} setMode={setMode} setWinner={setWinner} winner={winner}/>
        </>
    )
}

export default App
