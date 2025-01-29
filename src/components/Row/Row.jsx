import React from 'react'
import './Row.css'

/** 
 *  * Props:
 * - `col`: Array of the Tiles that will be in this Row.
 *   - 0: Empty Tile - Claimable
 *   - 1: Player Tile
 *   - 2: AI Tile
 * - `colNum`: The index of the column in the Array.
 * - `claimTile 
 */
const Row = ({row, rowIndex, claimTile}) => {
	/**
	 * Hanles click event on specific tiles if the tile is claimable.
	 * @param {Number} x - X cord
	 * @param {Number} y - Y cord
	 */
	function clicked(x, y) {
		if (row[y] !== 0) return;

		claimTile(x, y, 1, true)
	}

	return (
		<>
			{row.map((item, index) => {
				const availability = item === 0 ? "empty" :
					item === 1 ? "player" : "ai";
				return <div
					key={`${rowIndex}-${index}-${item}`}
					className={`tile ${availability}`}
					onClick={() => { clicked(rowIndex, index) }}
				></div>
			})}
		</>
	)
}

export default Row