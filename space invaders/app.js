document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    const resetbtn = document.querySelector('#start')
    let width = 15
    let currentShooterIndex = 202
    let currentInvadorIndex = 0
    let alienInvadersTakendown = []
    let result = 0
    let direction = 1
    let invadorId

    // ___________________ create invadors ___________________
    var alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]




    alienInvaders.forEach(invador => squares[currentInvadorIndex + invador].classList.add('invador'))

    // ___________________ create shooter ___________________
    squares[currentShooterIndex].classList.add('shooter')

    // ___________________ move the shooter ___________________

    function moveShoter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        if (e.keyCode === 39) {
            if (currentShooterIndex < 209)
                currentShooterIndex += 1
        } else if (e.keyCode === 37) {
            if (currentShooterIndex > 195)
                currentShooterIndex -= 1
        } else if (e.keyCode === 38) {
            shoote()
        }
        squares[currentShooterIndex].classList.add('shooter')
    }


    document.addEventListener('keydown', moveShoter)



    // ______________________________________ move invador ______________________________________

    function moveInvador() {
        const leftEdge = (alienInvaders[0] % width === 0)
        const rightEdge = (alienInvaders[alienInvaders.length - 1] % width === width - 1)
        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width

        } else if (direction === width) {
            if (leftEdge) direction = 1
            else direction = -1

        }

        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            squares[alienInvaders[i]].classList.remove('invador')
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            alienInvaders[i] += direction
        }
        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (!alienInvadersTakendown.includes(i)) {
                squares[alienInvaders[i]].classList.add('invador')
            }
        }

        // _____________________ game over condition __________________
        if (squares[currentShooterIndex].classList.contains('invador', 'shooter')) {
            squares[currentShooterIndex].classList.add("boom")
            alert("Game Over")
            clearInterval(invadorId)
        }

        for (let i = 0; i <= alienInvaders.length - 1; i++) {
            if (alienInvaders[i] > (squares.length - (width - 1))) {
                // resultDisplay.textContent = "Game Over"
                alert("Game Over")
                clearInterval(invadorId)
            }
        }
        // _________________________- check win condition ____________________
        if (alienInvadersTakendown.length === alienInvaders.length) {
            clearInterval(invadorId)
            clearInterval(laserId)
            alert("you Won")
        }

    }

    invadorId = setInterval(moveInvador, 250)

    //  __________________________ shoot at aliens _______________________
    function shoote(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex

        //  __________________________ move the laser _______________________
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
                //  __________________________ check boom _______________________
            if (squares[currentLaserIndex].classList.contains('invador')) {
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invador')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                clearTimeout(laserId)

                const alienTakeDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakendown.push(alienTakeDown)
                result++
                resultDisplay.textContent = result
            }


        }
        laserId = setInterval(moveLaser, 100)


    }



    resetbtn.addEventListener('click', reset)


})