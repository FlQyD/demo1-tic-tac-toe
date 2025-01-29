import checkForMatches from "./checkForMatches";
/**
 * Determines the best moves based on the rules in the calculateTileValue() function.
 * 
 * @param {Array<Array<Number>>} table - Table that we want the know the next move.
 * @param {Number} symbol - 1 / 2 the player that we want the calculate the next move for.
 * 
 * @returns {Object} - Returns an object containing an x, y key that we should do our next move.
 *  - "x" {Number}: X cord of the next move.
 *  - "y" {Number}: Y cord of the next move.
 */
export default function  getEnemyMove(table, symbol) {
    const valueTable = getEmptyValueTable();

    for (let x = 0; x < table.length; x++) {
        for (let y = 0; y < table.length; y++) {
            valueTable[x][y] = calculateTileValue(table, x, y, symbol)
        }
    }
    let maxX = 0;
    let maxY = 0;
    let maxValue = valueTable[maxX][maxY];
    for (let i = 0; i < valueTable.length; i++) {
        for (let j = 0; j < valueTable.length; j++) {
            if (valueTable[i][j] > maxValue) {
                maxX = i;
                maxY = j;
                maxValue = valueTable[i][j];
            }
        }
    }
    return {x: maxX,y: maxY}
}

/**
 * Calculates one tile's value based on it's position towards neighboring tiles and their values,
 * there is some predetermined bonus for being closer to the middle. Defensive moves are prioritized.
 * 
 * @param {Array<Array<Number>>} table - Current table.
 * @param {Number} x - X coordinate of our tile.
 * @param {Number} y - Y coordinate of our tile.
 * @param {Number} symbol - Symbol of our player.
 * 
 * @returns {Number} - Returns a number how beneficial to claim that tile. Only positive 
 *                       Numbers, except if the tile is already claimed.
 */
function calculateTileValue(table, x, y, symbol) {
    if (table[x][y] !== 0) return -10;

    const tempTable = copyTable(table);
    tempTable[x][y] = symbol;
    
    let tileValue = Math.random()*5;

    const maxBaseValue = 10;
    const centerX = Math.floor(tempTable.length/2)
    const centerY = Math.floor(tempTable[0].length/2)
    const distance = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));
    tileValue += (maxBaseValue - distance)*3; 

    const FIRST_NEIGHBOR_BONUS = 100
    const SECOND_NEIGHBOR_BONUS = 300
    const THIRD_NEIGHBOR_BONUS = 2000
    const FIVE_NEIGHBOR_BONUS = 50000

    const ENEMY_POTENTIAL_TWO_NEIGHBOR = 0;
    const ENEMY_POTENTIAL_THREE_NEIGHBOR = 0;
    const ENEMY_POTENTIAL_FOUR_NEIGHBOR = 5000;
    const ENEMY_POTENTIAL_FIVE_NEIGHBOR = 15000;


    /** BONUS TO EXTEND CURRENT LINES */
    const match = checkForMatches(tempTable, x, y);
    if (match.vertical === 2) tileValue += FIRST_NEIGHBOR_BONUS;    
    if (match.horizontal === 2) tileValue += FIRST_NEIGHBOR_BONUS;    
    if (match.leftDiagonal === 2) tileValue += FIRST_NEIGHBOR_BONUS;
    if (match.rightDiagonal === 2) tileValue += FIRST_NEIGHBOR_BONUS;
    
    if (match.vertical === 3) tileValue += SECOND_NEIGHBOR_BONUS;
    if (match.horizontal === 3) tileValue += SECOND_NEIGHBOR_BONUS;
    if (match.leftDiagonal === 3) tileValue += SECOND_NEIGHBOR_BONUS;
    if (match.rightDiagonal === 3) tileValue += SECOND_NEIGHBOR_BONUS;
    
    if (match.vertical === 4) tileValue += THIRD_NEIGHBOR_BONUS;
    if (match.horizontal === 4) tileValue += THIRD_NEIGHBOR_BONUS;
    if (match.leftDiagonal === 4) tileValue += THIRD_NEIGHBOR_BONUS;
    if (match.rightDiagonal === 4) tileValue += THIRD_NEIGHBOR_BONUS;

    if (match.vertical >= 5) tileValue += FIVE_NEIGHBOR_BONUS;
    if (match.horizontal >= 5) tileValue += FIVE_NEIGHBOR_BONUS;
    if (match.leftDiagonal >= 5) tileValue += FIVE_NEIGHBOR_BONUS;
    if (match.rightDiagonal >= 5) tileValue += FIVE_NEIGHBOR_BONUS;
    
    //ENEMY MOVE
    tempTable[x][y] = tempTable[x][y] === 1 ? 2 : 1;
    const enemyMatch = checkForMatches(tempTable, x, y);
    if (enemyMatch.vertical === 2) tileValue += ENEMY_POTENTIAL_TWO_NEIGHBOR;
    if (enemyMatch.horizontal === 2) tileValue += ENEMY_POTENTIAL_TWO_NEIGHBOR;
    if (enemyMatch.leftDiagonal === 2) tileValue += ENEMY_POTENTIAL_TWO_NEIGHBOR;
    if (enemyMatch.rightDiagonal === 2) tileValue += ENEMY_POTENTIAL_TWO_NEIGHBOR;

    if (enemyMatch.vertical === 3) tileValue += ENEMY_POTENTIAL_THREE_NEIGHBOR;
    if (enemyMatch.horizontal === 3) tileValue += ENEMY_POTENTIAL_THREE_NEIGHBOR;
    if (enemyMatch.leftDiagonal === 3) tileValue += ENEMY_POTENTIAL_THREE_NEIGHBOR;
    if (enemyMatch.rightDiagonal === 3) tileValue += ENEMY_POTENTIAL_THREE_NEIGHBOR;
    
    if (enemyMatch.vertical === 4) tileValue += ENEMY_POTENTIAL_FOUR_NEIGHBOR;
    if (enemyMatch.horizontal === 4) tileValue += ENEMY_POTENTIAL_FOUR_NEIGHBOR;
    if (enemyMatch.leftDiagonal === 4) tileValue += ENEMY_POTENTIAL_FOUR_NEIGHBOR;
    if (enemyMatch.rightDiagonal === 4) tileValue += ENEMY_POTENTIAL_FOUR_NEIGHBOR;

    if (enemyMatch.vertical >= 5) tileValue += ENEMY_POTENTIAL_FIVE_NEIGHBOR;
    if (enemyMatch.horizontal >= 5) tileValue += ENEMY_POTENTIAL_FIVE_NEIGHBOR;
    if (enemyMatch.leftDiagonal >= 5) tileValue += ENEMY_POTENTIAL_FIVE_NEIGHBOR;
    if (enemyMatch.rightDiagonal >= 5) tileValue += ENEMY_POTENTIAL_FIVE_NEIGHBOR;

    return Math.floor(tileValue);
}
/**
 * Returns a 2 dimensional Array filled with 0 as starting value. {Number}. 
 * @returns {Array<Array<Number>>}
 */
function getEmptyValueTable() {
    const tempTable = [];
    for (let i = 0; i < 10; i++) {
        const row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        tempTable.push(row)
    }
    return tempTable;
}
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