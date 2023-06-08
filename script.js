const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = 'YOUR COHORT NAME HERE';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        //console.log(response);
        const players = await response.json();
        return players;
    } catch (error) {
        console.error('Uh oh, trouble fetching players!', error);
    }
};


const fetchSinglePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    let playerContainer = document.querySelector(`#player-container`);
    try {
        playerContainer.innerHtml = '';
        playerList.forEach((player) =>{
            const playerElement = document.createElement('div');
      playerElement.classList.add('party');
      playerElement.innerHTML = `
                <h2>${player.name}</h2>
                <p>${player.breed}</p>
                <p>${player.age}</p>
                <button class="details-button" data-id="${party.id}">See Details</button>
                <button class="delete-button" data-id="${party.id}">Delete</button>
            `;
            playerContainer.appendChild(playerElement);
        });;
   
        // see details
const detailsButton = playerElement.querySelector('.details-button');
detailsButton.addEventListener('click', async (event) => {
  // get the id
  const playerId = event.target.dataset.id
  // send id to renderSinglePartyById function
  renderSinglePlayerById(playerId)
});

// delete pupper
const deleteButton = playerElement.querySelector('.delete-button');
deleteButton.addEventListener('click', async (event) => {
  // get the id
  const playerId = event.target.dataset.id
  // pass the id to deleteParty function
  deletePlayer(playerId)
  // get it off the page
  event.target.closest('div.party').remove()
});

} catch (error) {
console.error(error);
}
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();
