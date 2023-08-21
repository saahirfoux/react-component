import Blastoise from '../assets/imgs/Blastoise.png';
import Charizard from '../assets/imgs/Charizard.png';
import Charmander from '../assets/imgs/Charmander.png';
import Charmeleon from '../assets/imgs/Charmeleon.png';
import Ivysaur from '../assets/imgs/Ivysaur.png';
import Squirtle from '../assets/imgs/Squirtle.png';
import Venusaur from '../assets/imgs/Venusaur.png';
import Wartortle from '../assets/imgs/Wartortle.png';
import Metapod from '../assets/imgs/Metapod.png';
import Butterfree from '../assets/imgs/Butterfree.png';
import Caterpie from '../assets/imgs/Caterpie.png';
import Bulbasaur from '../assets/imgs/Bulbasaur.png';


// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const imagesEnum = {
    "blastoise": Blastoise,
    "charizard": Charizard,
    "charmander": Charmander,
    "charmeleon": Charmeleon,
    "ivysaur": Ivysaur,
    "squirtle": Squirtle,
    "venusaur": Venusaur,
    "wartortle": Wartortle,
    "metapod": Metapod,
    "butterfree": Butterfree,
    "caterpie": Caterpie,
    "bulbasaur": Bulbasaur
}

export {
    capitalizeFirstLetter,
    imagesEnum
}