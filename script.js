const playerList = document.getElementById('player-list');
const addPlayerBtn = document.getElementById('add-player-btn');

addPlayerBtn.addEventListener('click', function() {
  const playerName = document.getElementById('player-name').value;
  const playerBreed = document.getElementById('player-breed').value;
  
  const playerCard = document.createElement('div');
  playerCard.classList.add('player-card');
  
  const playerNameEl = document.createElement('h4');
  playerNameEl.innerText = `Name: ${playerName}`;
  
  const playerBreedEl = document.createElement('p');
  playerBreedEl.innerText = `Breed: ${playerBreed}`;
  
  playerCard.appendChild(playerNameEl);
  playerCard.appendChild(playerBreedEl);
  
  playerList.appendChild(playerCard);
});
const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-acc-et-web-pt-b';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
      const response = await fetch(APIURL);
      const players = await response.json();
      return players;
    } catch (err) {
      console.error('Uh oh, trouble fetching players!', err);
    }
  };

  const fetchSinglePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}${playerId}`);
      const player = await response.json();
      return player;
    } catch (err) {
      console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
  };

  const addNewPlayer = async (playerObj) => {
    try {
      const response = await fetch(APIURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerObj),
      });
      const newPlayer = await response.json();
      return newPlayer;
    } catch (err) {
      console.error('Oops, something went wrong with adding that player!', err);
    }
  };

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}${playerId}`, {
        method: 'DELETE',
      });
      const removedPlayer = await response.json();
      return removedPlayer;
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
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // Create the form element
    const formElement = document.createElement("form");
    formElement.id = "new-player-form";

    // Create input fields
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.placeholder = "Player Name";

    const breedInput = document.createElement("input");
    breedInput.type = "text";
    breedInput.name = "breed";
    breedInput.placeholder = "Breed";

    const statusInput = document.createElement("input");
    statusInput.type = "text";
    statusInput.name = "status";
    statusInput.placeholder = "Status";

    const imageURLInput = document.createElement("input");
    imageURLInput.type = "text";
    imageURLInput.name = "imageURL";
    imageURLInput.placeholder = "Image URL";

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Add Player";

    submitButton= dlt-player-btn.addEventListener('submit', function(event) {
        event.preventDefault();
    })

    // Add input fields and button to the form
    formElement.appendChild(nameInput);
    formElement.appendChild(breedInput);
    formElement.appendChild(statusInput);
    formElement.appendChild(imageURLInput);
    formElement.appendChild(submitButton);

    // Add event listener for form submission
    formElement.addEventListener("click", async (event) => {
      event.preventDefault();

      // Retrieve form input values
      const playerObj = {
        name: nameInput.value,
        breed: breedInput.value,
        status: statusInput.value,
        imageURL: imageURLInput.value,
      };
      console.log(playerObj);
      // Call the addNewPlayer function to add the player
      await addNewPlayer(playerObj);

      // Clear the form after submitting
      formElement.reset();

      // Fetch all players and render them
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    });

    // Append the form to the desired container in the DOM
    newPlayerFormContainer.appendChild(formElement);
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};