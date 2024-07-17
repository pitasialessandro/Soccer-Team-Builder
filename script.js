var player_name = document.getElementById('player-name')
var select_skill = document.getElementById('player-skill')
var player_grid = document.getElementById('player-grid')
var teams_panel = document.getElementById('teams-panel')
var team1 = document.getElementById('team-1')
var team2 = document.getElementById('team-2')
var player_count = 0
var sorted_players = [ ]

function submit_player() {
    if (player_name.value == '')
        alert('Inserisci nome giocatore')
    else if (select_skill.value == 'skill')
        alert('Seleziona la skill del giocatore')
    else if (player_count >= 22)
        alert('Hai inserito il numero massimo di giocatori')
    else {
        player_count++
        let player_element = document.createElement('div')
        player_element.classList.add('grid-item')
        player_element.innerHTML = player_name.value + `<span>&#10005;</span>`
        let player_skill = document.createElement('div')
        player_skill.classList.add('grid-item')
        player_skill.classList.add('skill-item')
        player_skill.innerHTML = select_skill.value

        player_grid.appendChild(player_element)
        player_grid.appendChild(player_skill)

        // inserting the player in the array
        let player = [ player_name.value, Number(select_skill.value) ]
        linear_search(player)

        player_name.value = ''
        select_skill.value = 'skill'
        //saveData();
    }
}
// i dont have an efficient way (O(1)) to delete the players but nvm it should host max 22 players
// which will be still ok with a linear search through the array to find the player to delete

// inserting new players with O(n) time, can be optimized with binary search 
function linear_search(player) {
    let i = 0
    while (i < sorted_players.length && player[1] > sorted_players[i][1]) i++
    sorted_players.splice(i, 0, player)
}

// linear search again not really efficient but idc
function remove_from_array(name, skill) {
    player_count--
    for (let i = 0; i < sorted_players.length; i++) {
        if ( sorted_players[i][0] == name && sorted_players[i][1] == skill) {
            sorted_players.splice(i, 1)
            return
        }
    }
    alert('couldn\'t find element in sorted array')
}

player_grid.addEventListener('click', function(e) {
    if (e.target.tagName === "SPAN") {
        let name = e.target.parentElement
        let skill = name.nextElementSibling
        remove_from_array(name.innerText.slice(0, -2), skill.innerText)
        skill.remove();
        name.remove();
        //saveData()
    }
}, false)

function generate_teams() {
    if (player_count <= 1) {
        alert('Inserisci almeno 2 giocatori')
        return
    }
    let team1_list = ''
    let team2_list = ''
    let i = 0
    for (let player of sorted_players) {
        if (i % 2 == 0)
            team1_list += player[0] + ' '
        else
            team2_list += player[0] + ' '
        i++
    }
    team1.innerText = team1_list
    team2.innerText = team2_list
    teams_panel.classList.remove('hidden')
    teams_panel.classList.add('visible')
}

// TODO: Add local storage feature
/*
function saveData() {
    localStorage.saveData("player-data", player_grid.innerHTML)
    localStorage.saveData("count-data", player_count)
    localStorage.saveData("sorted-players", sorted_players)
}
function showPlayers() {
    player_grid.innerHTML = localStorage.getItem("player-data")
    player_count = localStorage.getItem("count-data")
    sorted_players = localStorage.getItem("sorted-players")
}
*/
//showPlayers()