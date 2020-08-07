var player1 = prompt('Player One: Please enter Your Name, and you will be Blue')
var player1color = 'blue'
var player2 = prompt('Player Two: Please enter Your Name, and you will be Red')
var player2color = 'red'

var playerMarker = player1color
var playerName = player1 

function changeColor(rowNum, colNum, playerColor) {
    $('tr').eq(rowNum).find('button').eq(colNum).css('background-color', playerColor)
}

function returnColor(rowNum, colNum) {
    return $('tr').eq(rowNum).find('button').eq(colNum).css('background-color')
}

function checkBottom(colNum) {
    for (i=5; i>=0; i--) {
        if (returnColor(i, colNum) == "rgb(128, 128, 128)"){
            return i
        }
    }
}

function matchCheck(color1, color2, color3, color4) {
    return color1 === color2 && color2 === color3 && color3 === color4 && color1 !== "rgb(128, 128, 128)" && color1 !== undefined
}

function horizontalWinCheck() {
    for (row = 0; row <= 5; row++) {
        for (column = 0; column <=3; column++) {
            if (matchCheck(returnColor(row, column), returnColor(row, column+1), returnColor(row, column+2), returnColor(row, column+3))) {
                // console.log(returnColor(row, column), returnColor(row, column+1), returnColor(row, column+2), returnColor(row, column+3))
                return true
            }
        }
    }
}

function verticalWinCheck() {
    for (row = 0; row <= 2; row++) {
        for (column = 0; column <=6; column++) {
            if (matchCheck(returnColor(row, column), returnColor(row+1, column), returnColor(row+2, column), returnColor(row+3, column))) {
                // console.log(returnColor(row, column), returnColor(row+1, column), returnColor(row+2, column), returnColor(row+3, column))
                return true
            }
        }
    }
}

function diagonalWinCheck() {
    for (row = 0; row <= 2; row++) {
        for (column = 0; column <=3; column++) {
            if (matchCheck(returnColor(row, column), returnColor(row+1, column+1), returnColor(row+2, column+2), returnColor(row+3, column+3))) {
                // console.log(returnColor(row, column), returnColor(row+1, column+1), returnColor(row+2, column+2), returnColor(row+3, column+3))
                return true
            }
        }
    }
    for (row = 3; row <= 5; row++) {
        for (column = 0; column <=3; column++) {
            if (matchCheck(returnColor(row, column), returnColor(row-1, column+1), returnColor(row-2, column+2), returnColor(row-3, column+3))) {
                // console.log(returnColor(row, column), returnColor(row-1, column+1), returnColor(row-2, column+2), returnColor(row-3, column+3))
                return true
            }
        }
    }
}

function fullBoardCheck() {
    for (row = 0; row<=5; row++) {
        for (column = 0; column <=6; column++) {
            if (returnColor(row, column) === "rgb(128, 128, 128)") {
                return false
            }
        }
    }
    return true
}

$('button').on('click', function() {
    var col = $(this).closest("td").index()
    // console.log(checkBottom(col))
    if(checkBottom(col) !== undefined) {
        changeColor(checkBottom(col), col, playerMarker)
        if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
            if (playerMarker === player1color) {
                $('h3').text('Congratulation ' + player1 + ', you win!')
            } else {
                $('h3').text('Congratulation ' + player2 + ', you win!')
            }
            $('h2').text('You can refresh the page to play again!')
            $('button').off('click')
        } else if (fullBoardCheck()) {
            $('h3').text('You two tied!')
            $('h2').text('You can refresh the page to play again!')
            $('button').off('click') 
        } else {
            if (playerMarker === player1color) {
                playerMarker = player2color
                playerName = player2
            } else {
                playerMarker = player1color
                playerName = player1
            }
    
            $('h3').text("It's " + playerName + "'s turn!" )
        }
    }
})
