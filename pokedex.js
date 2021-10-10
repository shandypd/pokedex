const API_BASE_URL = "https://pokeapi.co/api/v2";

fetch(API_BASE_URL + "/pokedex/2")
    .then(response => response.json())
    .then(data => {
        return Promise.all(data.pokemon_entries.map(entry => fetch(API_BASE_URL + `/pokemon/${entry.pokemon_species.name}`)
            .then(response => response.json())
        ));
    })
    .then(data => data.forEach(renderPokedexItem))

function renderPokedexItem(data) {
    const itemEl = createPokemon(data);

    const pokedexEl = document.querySelector('.pokedex');
    pokedexEl.appendChild(itemEl);
}

function createPokemon(data) {
    const imageEl = createPokemonImage(data);
    const numberEl = createPokemonIdText(data);
    const nameEl = createPokemonNameText(data);
    const typesEl = createPokemonTypesList(data);

    const itemEl = document.createElement('div');
    itemEl.classList.add('pokemon');
    itemEl.appendChild(imageEl);
    itemEl.appendChild(numberEl);
    itemEl.appendChild(nameEl);
    itemEl.appendChild(typesEl);

    return itemEl;
}

function createPokemonImage(data) {
    const imageEl = document.createElement('img');
    imageEl.src = data.sprites.front_default;
    imageEl.alt = data.name;

    return imageEl;
}

function createPokemonIdText(data) {
    const el = document.createElement('div');
    el.classList.add('poke-id');
    el.innerText = `#${String(data.id).padStart(3, '0')}`;

    return el;
}

function createPokemonNameText(data) {
    const el = document.createElement('div');
    el.classList.add('poke-name');
    el.innerText = data.name;

    return el;
}

function createPokemonTypesList(data) {
    const el = document.createElement('ul');

    let types;
    if (data.past_types.length > 0) {
        types = data.past_types[0].types;
    } else {
        types = data.types;
    }

    for (let type of types) {
        const typeEl = createPokemonTypeItem(type.type.name);
        el.classList.add('poke-type-list');
        el.appendChild(typeEl);
    }

    return el;
}

function createPokemonTypeItem(name) {
    const el = document.createElement('li');
    el.classList.add('poke-type', name);
    el.innerText = name;

    return el;
}
