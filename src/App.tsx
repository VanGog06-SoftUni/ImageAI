import styles from "./App.module.css";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
import { useImageLoader } from "./hooks/useImageLoader";

function App() {
  const { imageSrc, openImage } = useImageLoader();

  return (
    <div className={styles.app}>
      <Header onOpenImage={openImage} />
      <main className={styles.main}>
        <ImagePreview src={imageSrc} />
      </main>
    </div>
  );
}

export default App;
