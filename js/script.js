const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const search = document.querySelector('.search');
const prevButton = document.querySelector('.button_prev')
const nextButton = document.querySelector('.button_next')

let searchPokemon='1';

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon= async (pokemon)=>{

    pokemonName.innerHTML="Carregando";
    pokemonNumber.innerHTML="";

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokemonImage.style.display='block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        search.value='';
        searchPokemon = data.id;
    }else{
        pokemonImage.style.display='none'
        pokemonName.innerHTML="Pokémon not found"
        pokemonNumber.innerHTML=""
    } 
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(search.value.toLowerCase());
})

nextButton.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});

prevButton.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
});

renderPokemon(searchPokemon);