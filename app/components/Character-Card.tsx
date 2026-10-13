import styles from "./CharacterCard.module.css";

type CharacterCardProps = {
  name: string;
  image: string;
  status: string;
  species: string;
};

export default function CharacterCard({
  name,
  image,
  status,
  species,
}: CharacterCardProps) {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={image}
        alt={name}
      />

      <div className={styles.info}>
        <h2 className={styles.name}>{name}</h2>
        <p>Estado: {status}</p>
        <p>Especie: {species}</p>
      </div>
    </div>
  );
}