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
    return newPlayer.data.player; // Return the new player object
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
    return null;
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

const renderNewPlayerForm = () => {
  try {
    const formHTML = document.createElement("div");
    formHTML.classList.add("form");
    formHTML.innerHTML = `
            <h3>Add a new player!</h3>
            <form id="new-player-form">
                <label for="name">Name:</label>
                <input type="text" id="name" required>
                <label for="breed">Breed:</label>
                <input type="text" id="breed" required>
                <label for="status">Status (field or bench):</label>
                <input type="text" id="status" required>
                <label for="image">ImageURL (in .JPG):</label>
                <input type="text" id="image" required>
                <button type="submit">Add Player</button>
            </form>
        `;

    // Add event listener to the form submission
    const formElement = formHTML.querySelector("#new-player-form");
    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const breed = document.getElementById("breed").value;
      const status = document.getElementById("status").value;
      const image = document.getElementById("image").value;

      const playerObj = {
        name: name,
        breed: breed,
        status: status,
        imageUrl: image,
      };
      await addNewPlayer(playerObj);
      alert(
        `New player has been created! Everybody welcome ${playerObj.name}!`
      );
      const playerList = await fetchAllPlayers();
      renderAllPlayers(playerList);
    });

    // Append the form inside newPlayerFormContainer
    newPlayerFormContainer.append(formHTML);
  } catch (error) {
    console.error("Trouble rendering players", error);
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
