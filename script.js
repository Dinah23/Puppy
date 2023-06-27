
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${2302-acc-et-web-pt-b}/players`;
var playerRoster;
var TEAM_ID = 891;
var  COHORT_ID = 479;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.

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


    // Append the form to the desired container in the DOM
    newPlayerFormContainer.appendChild(formElement);
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};