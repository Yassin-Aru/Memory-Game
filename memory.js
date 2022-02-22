//  Slelelct items
document.querySelector('.control-buttons span').onclick = function() {

    // Prompt window to ask for Player Name
    let yourName = prompt('What is your Name?');

    if(yourName == null || yourName == '' || yourName.length > 10){

        document.querySelector('.name span').innerHTML = 'Unknown';
    } else {
        document.querySelector('.name span').innerHTML = yourName;
    }
    // Remove the splash Screen
    document.querySelector('.control-buttons').remove();

    // show the carts
}

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRnage = [...Array(blocks.length).keys()]; 

// let orderRnage = Array.from(Array(blocks.length).keys()) //!  Another way To select this Array; 

shuffle(orderRnage);

//  TODO: Add 'order' css property to game blocks
blocks.forEach((block, index) =>{

    // Add Css order PROPERTY
   block.style.order= orderRnage[index];

   //Add click event
   block.addEventListener('click', function() {

    //trigger the flip block function
    flipBlock(block);
   });
});

// Flip Block Function
function flipBlock(selectedBlock){

   // Add Class
   selectedBlock.classList.add('is-flipped');

   // collect all flipped cards
   let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

   // if theres two selected blocks
   if(allFlippedBlocks.length === 2){

    //  TODO Stop Clicking function
    stopClicking();

    //TODO Check Matched block function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
   }
}
//? Stop clicking function
function stopClicking(){

    //!! aDD class no-clicking
    blocksContainer.classList.add('no-clicking');

    setTimeout(() =>{

        // Remove class co-clickng after duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}
//TODO => check matched block
function checkMatchedBlocks(firstBlock, secondBlock){

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    } else{

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout( () =>{
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}

// TODO Shiffl function
function shuffle(array){
    // Setting Vars
    let current = array.length,
        temp,
        random;
    
    while (current >0){

        // Get Random Number
        random =Math.floor(Math.random() * current);

        // Decrease length by one evrey shuffle
        current--;

        // [1] Save current element element in stash
        temp = array[current];

        // [2] Current element = Random Element 
        array[current] = array[random];

        // [3] Random element = Get element from stash
        array[random] = temp;
    }

    return array;
}
