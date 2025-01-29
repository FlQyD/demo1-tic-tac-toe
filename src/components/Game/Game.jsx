import React, { useEffect, useState, useRef, useReducer} from 'react'
import "./Game.css";
import Rows from '../Rows/Rows';
import checkForWinner from './checkForWinner';
import getEnemyMove from './getEnemyMove';

const Game = ({mode, setMode, winner, setWinner}) => {
    const [table, setTable] = useState(getEmptyTable())
    const turn = useRef(1)

    useEffect(() => {
        if (mode === null) return
        turn.current = 1;

        const emptyTable = getEmptyTable();
        setTable(emptyTable);
    }, [mode])
    
    useEffect(() => {
        if (mode === null) return;
        if (table.length === 0) return;
        if (mode === "HvA" && turn.current === 1) return

        const enemyMove = getEnemyMove(table, turn.current)        
        setTimeout(() => {
            claimTile(enemyMove.x, enemyMove.y)
        }, 300);
    }, [table])
    

    function claimTile(x, y, symbol, player=false) {
        if (player && mode === "AvA") return;
        if (player && turn.current === 2) return;
        if (winner !== 0) return;

        const newTable = copyTable(table);
        newTable[x][y] = turn.current;
        
        const win = checkForWinner(newTable, x, y)
        if (win){
            console.log("WINNER", x, y);
            
            setWinner(turn.current);
            setMode(null);
        } 

        const over = checkForDrawn(newTable)        
        if (over) {
            setWinner(3);
            setMode(null);
        }

        turn.current = turn.current === 1 ? 2 : 1;        
        setTable(newTable)        
    }    
  return (
    <div id="game-holder">
        <div id="game">
            <Rows table={table} claimTile={claimTile} mode={mode} />
        </div>
    </div>
  )
}

Game.propTypes = {}

export default Game
/**
 * Creates a deep copy of a table.
 * @param {Array<Array<Number>>} table 
 * @returns {Array<Array<Number>>}
 */
function copyTable(table) {
    const newTable = table.map((row) => {
        return [...row];
    })
    return newTable;
}
/**
 * Constructs a two dimensional Array with 0 for every value and a length of 10 for both. 
 * @returns {Array<Array<Number>>} Table that we can store the game's current state
 */
function getEmptyTable() {
    const tempTable = [];
    for (let i = 0; i < 10; i++) {
        const row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tempTable.push(row)
    }
    return tempTable;
}
/**
 * Checks if there is any tiles left that can be claimed.
 * @param {Array<Array<Number>>} table table that we are working on.
 * @returns {Boolean} true if there is no more claimable tile, false otherwise
 */
function checkForDrawn(table) {
    for (let i = 0; i < table.length; i++) {        
        if (table[i].some(item => item === 0)) return false;
    }
    return true;
}