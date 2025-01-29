import React, { useEffect } from 'react'
import "./Menu.css"

const Menu = ({setWinner, winner, setMode, setMenu }) => {

	function start(mode) {
		setMode(mode);
		setMenu("close")
		setWinner(0)
	}

	return (
		<div id="menu-background">
			<div id="main">
				<h1>{winner === 0 ? "Tic Tac Toe" : 
				     winner === 1 ? (<>
					 					<span className='red'>Red</span> won! 
					 				</>):
					 winner === 2 ? (<>
										<span className='yellow'>Yellow</span> won!
									</>) : "Draw game!"
					}</h1>
				<button onClick={() => { start("HvA") }}>Play Now</button>
				<button onClick={() => { start("AvA") }}>AI vs AI</button>
			</div>
		</div>
	)
}

export default Menu