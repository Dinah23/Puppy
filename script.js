const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2302-ACC-ET-WEB-PT-B";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

//fetch all players
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}players/`);
    const players = await response.json();
    return players.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return []; // returns empty array in case of an error
  }
};

// fetch single player
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}players/${playerId}`);
    const player = await response.json();
    console.log(player);
    return player.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    return null;
  }
};

// add a new player
const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${APIURL}players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });

    const newPlayer = await response.json();
    return newPlayer;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
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

// remove a player
const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
    });
    const puppy = await response.json();
    console.log(puppy);

    window.location.reload();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

// render a single player by id
const renderSinglePlayerById = async (playerId) => {
  try {
    // Fetch player details from the server
    const player = await fetchSinglePlayer(playerId);

    // Create a new HTML element to display player details
    const playerDetailsElement = document.createElement("div");
    playerDetailsElement.classList.add("player-details");

    // Display single player in the main player container only
    playerContainer.innerHTML = "";
    playerDetailsElement.innerHTML = `
      <h2>${player.name.toUpperCase()}</h2>
      <p>Breed: ${player.breed}</p>
      <p>Status: ${player.status}</p>
      <p>Created at: ${player.createdAt}</p>
      <p>Status: ${player.status}</p>
      <img src="${player.imageUrl}" alt="NO IMAGE AVAILABLE"> 
      <button class="close-button">Close</button>
    `;

    playerContainer.appendChild(playerDetailsElement);

    // add event listener to close button
    const closeButton = playerContainer.querySelector(".close-button");
    closeButton.addEventListener("click", async () => {
      // reload the page
      location.reload();
    });
  } catch (error) {
    console.error(error);
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
    playerContainer.innerHTML = "";
    playerList.forEach((player) => {
      const playerElement = document.createElement("div");
      playerElement.classList.add(`player`);
      playerElement.innerHTML = `
        <h2>${player.name.toUpperCase()}</h2>
        <p>Breed: ${player.breed}</p>
        <p>Status: ${player.status}</p>
        <p>Created at: ${player.createdAt}</p>
        <img src="${player.imageUrl}" alt="NO IMAGE AVAILABLE">
        <button class="details-button">See Details</button>
        <button class="remove-button">Remove from Roster</button>
      `;

      // Add event listener to the details button
      const detailsButton = playerElement.querySelector(".details-button");
      detailsButton.addEventListener("click", async () => {
        console.log(player.id);
        await renderSinglePlayerById(player.id);
      });

      // Add event listener to the remove button
      const removeButton = playerElement.querySelector(".remove-button");
      removeButton.addEventListener("click", async () => {
        await removePlayer(player.id);
        const updatedPlayers = await fetchAllPlayers();
        renderAllPlayers(updatedPlayers);
      });

      playerContainer.appendChild(playerElement);
    });
  } catch (error) {
    console.error(error);
  }
};

// render all players on page load
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
