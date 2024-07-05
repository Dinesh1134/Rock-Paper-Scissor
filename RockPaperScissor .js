    let score =  JSON.parse(localStorage.getItem('score'))||
        {
            win:0,
            loss:0,
            tie:0
        }
    updateScore()
    
    let isAutoPlay = false;
    let intervalId;
    function autoPlay(){
        if(!isAutoPlay){
            intervalId = setInterval(() => {
                const playerMove = pickComputerMove()
                playGame(playerMove)
            }, 1000)
            isAutoPlay = true
            document.querySelector('.js-autoPlay-button').innerHTML = 'Stop Playing'
        }else{
            clearInterval(intervalId)
            isAutoPlay = false
             document.querySelector('.js-autoPlay-button').innerHTML = 'Auto Play'
        }
    }

    document.querySelector('.js-rock')
    .addEventListener('click', () => {
        playGame('Rock')
    })

    document.querySelector('.js-paper')
    .addEventListener('click', () => {
        playGame('Paper')
    })

    document.querySelector('.js-scissor')
    .addEventListener('click', () => {
        playGame('Scissor')
    })

    document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        showNotification()
    })


    function showNotification(){

        document.querySelector('.js-confirmation').innerHTML = `<p class="confirmation">Are you sure you want to reset the score? <button class="js-confirm-yes-button">Yes</button> <button class="js-confirm-no-button">No</button></p>` 

        document.querySelector('.js-confirm-yes-button').addEventListener('click', () => {
            score.win = 0
            score.loss = 0
            score.tie = 0
            updateScore()
            hiddenConfirmNotifi()
        })
        
        document.querySelector('.js-confirm-no-button').addEventListener('click', () => {
            hiddenConfirmNotifi()
        })

    }

    function hiddenConfirmNotifi(){
        document.querySelector('.js-confirmation').innerHTML = ''
    }

    document.querySelector('.js-autoPlay-button')
    .addEventListener('click', () => {
        autoPlay()
    })

    document.body.addEventListener('keydown', (event) => {
        if(event.key === 'r'){
            playGame('Rock')
        }
        else if(event.key === 'p'){
            playGame('Paper')
        }
        else if(event.key === 's'){
            playGame('Scissor')
        }else if(event.key === 'a'){
            autoPlay()
        }else if(event.key === 'Backspace'){
            showNotification()
        }
    })

    function playGame(playerMove){
        const computerMove = pickComputerMove();
        let result = '';

    if(playerMove === 'Scissor'){
        if(computerMove === 'Rock'){
            result = 'You Loss';
        }
        else if(computerMove === 'Paper'){
            result = 'You Win';
        }
        else if(computerMove === 'Scissor'){
            result = 'Tie';
        }
    }else if(playerMove === 'Paper'){
            if(computerMove === 'Rock'){
            result = 'You Win';
        }
        else if(computerMove === 'Paper'){
            result = 'Tie';
        }
        else if(computerMove === 'Scissor'){
            result = 'You Loss';
        }
    }else if(playerMove === 'Rock'){
            if(computerMove === 'Rock'){
            result = 'Tie';
        }
        else if(computerMove === 'Paper'){
            result = 'You Loss';
        }
        else if(computerMove === 'Scissor'){
            result = 'You Win';
        }

    }

    if(result === 'You Win'){
        score.win ++
    }else if(result === 'You Loss'){
        score.loss ++
    }else if(result === 'Tie'){
        score.tie ++
    }

    document.querySelector('.js-move').innerHTML = `You
    <img class="move-icon" src="image/${playerMove}-emoji.png" alt="">
    <img class="move-icon" src="image/${computerMove}-emoji.png" alt="">
    Computer`

    document.querySelector('.js-result').innerHTML = result

    updateScore()
    }

    function updateScore(){

    document.querySelector('.js-score').innerHTML = `Wins: ${score.win} Loss: ${score.loss} Tie: ${score.tie}`
    localStorage.setItem('score', JSON.stringify(score))    
}

    function pickComputerMove(){
    const randomNumber = Math.random();

    let computerMove = '';

    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'Rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3 ){
        computerMove = 'Paper';
    }
    else if (randomNumber >= 2/3 && randomNumber < 1 ){
        computerMove = 'Scissor';
    }

    return computerMove;
    }

