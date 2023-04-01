import styles from "./styles.module.css";

const headers = [
  {
    id: 1,
    text: "Date",
  },
  {
    id: 2,
    text: "Type",
  },
  {
    id: 3,
    text: "Price",
  },
];

const Head = () => {
  return (
    <div className={`card flex gap-2 py-0 mb-0 ${styles.tableContainer}`}>
      {headers.map(({ id, text }) => {
        return (
          <div key={id} className={styles.tableHeaders}>
            {text}
          </div>
        );
      })}
    </div>
  );
};

export default Head;
