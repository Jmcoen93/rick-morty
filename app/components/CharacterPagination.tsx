
"use client";

import { useState } from "react";
import CharacterCard from "./Character-Card";

type Personaje = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

type CharacterPaginationProps = {
  personajes: Personaje[];
  totalPaginasApi: number;
};

export default function CharacterPagination({
  personajes,
  totalPaginasApi,
}: CharacterPaginationProps) {
  const [todosLosPersonajes, setTodosLosPersonajes] =
    useState(personajes);

  const [paginaActual, setPaginaActual] = useState(1);
  const [paginaApi, setPaginaApi] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("");
const [filtroEspecie, setFiltroEspecie] = useState("");

  const personajesPorPagina = 8;

  const indiceUltimo = paginaActual * personajesPorPagina;
  const indicePrimero = indiceUltimo - personajesPorPagina;

const personajesFiltrados = todosLosPersonajes.filter((personaje) => {
  const coincideEstado =
    filtroEstado === "" || personaje.status === filtroEstado;

  const coincideEspecie =
    filtroEspecie === "" || personaje.species === filtroEspecie;

  return coincideEstado && coincideEspecie;
});

const personajesActuales = personajesFiltrados.slice(
  indicePrimero,
  indiceUltimo
);

  async function cargarSiguientePagina() {
    if (paginaActual * personajesPorPagina < todosLosPersonajes.length) {
      setPaginaActual(paginaActual + 1);
      return;
    }

    if (paginaApi >= totalPaginasApi || cargando) {
      return;
    }

    setCargando(true);

    try {
      const siguientePagina = paginaApi + 1;

      const respuesta = await fetch(
        `https://rickandmortyapi.com/api/character?page=${siguientePagina}`
      );

      if (!respuesta.ok) {
        throw new Error("No se pudieron cargar los personajes");
      }

      const datos = await respuesta.json();

      setTodosLosPersonajes((anteriores) => [
        ...anteriores,
        ...datos.results,
      ]);

      setPaginaApi(siguientePagina);
      setPaginaActual(paginaActual + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  }

  function paginaAnterior() {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  }

function volverPrimeraPagina() {
  setPaginaActual(1);
}

  return (
    <div>

         <div className="filters">
        <label>
          Estado:
          <select
            value={filtroEstado}
            onChange={(e) => {
              setFiltroEstado(e.target.value);
              setPaginaActual(1);
            }}
          >
            <option value="">Todos</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </label>

        <label>
          Especie:
          <select
            value={filtroEspecie}
            onChange={(e) => {
              setFiltroEspecie(e.target.value);
              setPaginaActual(1);
            }}
          >
            <option value="">Todas</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alienígena</option>
            <option value="Humanoid">Humanoide</option>
            <option value="Poopybutthole">Poopybutthole</option>
            <option value="Mythological Creature">Criatura mitológica</option>
            <option value="Animal">Animal</option>
            <option value="Robot">Robot</option>
            <option value="Cronenberg">Cronenberg</option>
            <option value="Disease">Enfermedad</option>
          </select>
        </label>
      </div>
            <div className="character-grid">
        {personajesActuales.map((personaje) => (
          <CharacterCard
            key={personaje.id}
            name={personaje.name}
            image={personaje.image}
            status={personaje.status}
            species={personaje.species}
          />
        ))}
      </div>

<div className="first-page">
  <button
    className="pagination-button"
    onClick={volverPrimeraPagina}
    disabled={paginaActual === 1 || cargando}
  >
    Primera página
  </button>
</div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={paginaAnterior}
          disabled={paginaActual === 1 || cargando}
        >
          Anterior
        </button>

        <span className="pagination-text">
          Página {paginaActual}
        </span>

        <button
          className="pagination-button"
          onClick={cargarSiguientePagina}
          disabled={cargando || (paginaApi >= totalPaginasApi &&
            paginaActual * personajesPorPagina >= todosLosPersonajes.length)}
        >
          {cargando ? "Cargando..." : "Siguiente"}
        </button>
        
      </div>
    </div>
  );
}