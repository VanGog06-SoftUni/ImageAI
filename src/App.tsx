import styles from "./App.module.css";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
import { useImageLoader } from "./hooks/useImageLoader";

function App() {
  const { imageSrc, filePath, isProcessing, openImage, applyGrayscale } =
    useImageLoader();

  return (
    <div className={styles.app}>
      <Header
        onOpenImage={openImage}
        onGrayscale={applyGrayscale}
        isGrayscaleDisabled={!filePath || isProcessing}
      />
      <main className={styles.main}>
        <ImagePreview
          src={imageSrc}
          isProcessing={isProcessing}
          processingText="Applying grayscale..."
        />
      </main>
    </div>
  );
}

export default App;
