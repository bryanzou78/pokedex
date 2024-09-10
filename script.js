const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const spriteContainer = document.getElementById('sprite-container');
const pokemonTypes = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

//Fetch pokemon api
const fetchData = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase().trim();
    if (!pokemonNameOrId) {
      alert("Please enter a Pokémon name or ID");
      return;
    }

    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    if (!res.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await res.json();
    getPokemonData(data);

  } catch (err) {
    alert(err.message || "An error occurred");
    console.log(err);
  }
};

//Handle Pokemon stats
const getPokemonData = data => {
  const {name, id, weight, height, sprites, types, stats} = data;

  pokemonName.textContent = name.toUpperCase();
  pokemonId.textContent = `ID: #${id}`;
  pokemonWeight.textContent = `Weight: ${weight}`;
  pokemonHeight.textContent = `Height: ${height}`;

  spriteContainer.innerHTML = `<img id="sprite" src ="${sprites.front_default}">`;

  hp.textContent = `HP: ${stats[0].base_stat}`;
  attack.textContent = `Attack: ${stats[1].base_stat}`;
  defense.textContent = `Defense: ${stats[2].base_stat}`;
  specialAttack.textContent = `Special Attack: ${stats[3].base_stat}`;
  specialDefense.textContent = `Special Defense: ${stats[4].base_stat}`;
  speed.textContent = `Speed: ${stats[5].base_stat}`;

  pokemonTypes.innerHTML = types
  .map(obj => `<span class="types">${obj.type.name.toUpperCase()}</span>`)
  .join(' ');

};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  fetchData();
});
