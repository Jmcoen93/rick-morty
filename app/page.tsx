import CharacterCard from "./components/Character-Card";
import CharacterPagination from "./components/CharacterPagination";

export default async function Home() {
 const respuesta = await fetch(
  "https://rickandmortyapi.com/api/character"
);

const datos = await respuesta.json();

return (
  <main>
     <header className="header">
      <img
  src="/rick-morty.png"
  alt="Rick y Morty"
  className="header-image"
/>
    </header>
    <CharacterPagination
  personajes={datos.results}
  totalPaginasApi={datos.info.pages}
/>
  </main>
);
}