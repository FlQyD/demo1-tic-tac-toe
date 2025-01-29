import checkForMatches from "./checkForMatches";

/**
 * Determines if there is at least five aligned tiles are claimed by the same
 * player on certain X,Y coordinate on the table.
 * 
 * @param {Array<Array<Number>>} table - Table that we are looking on.
 * @param {Number} x - X coordinate where we are starting
 * @param {Number} y - Y coordinate where we are starting.
 * 
 * @returns {Boolean} - true if there is at least 5 aligned tile going trough the spot, false otherwise.
 */
export default function checkForWinner(table, x, y) {
    const check = checkForMatches(table, x, y);    

    if (check.horizontal >= 5) return true;
    if (check.vertical >= 5) return true;
    if (check.leftDiagonal >= 5) return true;
    if (check.rightDiagonal >= 5) return true;

    return false;
}