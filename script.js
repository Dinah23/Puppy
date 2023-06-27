const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${2302-acc-et-web-pt-b}/players`;
var playerRoster;
var TEAM_ID = 891;
var  COHORT_ID = 479;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
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


const removePlayer = async (playerId) => {
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
