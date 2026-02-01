import Header from "./components/Header";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main} />
    </div>
  );
}

export default App;
