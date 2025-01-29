/**
 * Counts the same aligned tiles on each axis and returns them.
 * 
 * @param {Array<Array<Number>>} table - Table that we are working with.
 * @param {Number} x - X coordinate of the table where we are looking for.
 * @param {Number} y - Y coordinate of the table where we are looking on.
 * @returns {Object} - An object with keys for each axis and the matches on those.
 *  - "vertical" - Number of matching tiles on the vertical axis
 *  - "horizontal" - Number of matching tiles on the horizontal axis
 *  - "leftDiagonal" - Number of matching tiles on the left diagonal axis
 *  - "rightDiagonal" - Number of matching tiles on the right diagonal axis
 */
export default function checkForMatches(table, x, y) {
    if (table[x][y] === 0) return null;

    const returnStatement = {};
    const symbol = table[x][y];

    returnStatement.vertical = countMatchInVertical(symbol, table, x, y);
    returnStatement.horizontal = countMatchInHorizontal(symbol, table, x, y);
    returnStatement.leftDiagonal = countMatchInLeftDiagonal(symbol, table, x, y);
    returnStatement.rightDiagonal = countMatchInRightDiagonal(symbol, table, x, y);

    return returnStatement;
}
function countMatchInVertical(symbol, table, x, y) {
    let match = 1;
    let checkX = x - 1;
    let checkY = y;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkX--;
    }
    checkX = x + 1;
    checkY = y;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkX++;
    }

    return match;
}
function countMatchInHorizontal(symbol, table, x, y) {
    let match = 1;
    let checkX = x;
    let checkY = y - 1;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkY--;
    }
    checkX = x;
    checkY = y + 1;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkY++;
    }
    return match;
}
function countMatchInLeftDiagonal(symbol, table, x, y) {
    let match = 1;
    let checkX = x - 1;
    let checkY = y - 1;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkY--;
        checkX--;
    }
    checkX = x + 1;
    checkY = y + 1;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkY++;
        checkX++;
    }

    return match;
}
function countMatchInRightDiagonal(symbol, table, x, y) {
    let match = 1;
    let checkX = x - 1;
    let checkY = y + 1;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkX--;
        checkY++;
    }
    checkX = x + 1;
    checkY = y - 1;
    while (table[checkX] && table[checkX][checkY] === symbol) {
        match++;
        checkX++;
        checkY--;
    }

    return match;
}