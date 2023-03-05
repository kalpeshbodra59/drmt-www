import styles from "./styles.module.css";

const headers = [
  {
    id: 1,
    text: "Date",
  },
  {
    id: 2,
    text: "L. No.",
  },
  {
    id: 3,
    text: "Total D.",
  },
  {
    id: 4,
    text: "Total D. W.",
  },
  {
    id: 5,
    text: "Worked D.",
  },
  {
    id: 6,
    text: "Worked D. W.",
  },
  {
    id: 7,
    text: "Percentage",
  },
  {
    id: 8,
    text: "Actions",
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
