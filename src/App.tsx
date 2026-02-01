import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
import styles from "./App.module.css";

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleOpenImage = async () => {
    const filePath = await open({
      multiple: false,
      directory: false,
      filters: [
        {
          name: "Images",
          extensions: ["png", "jpg", "jpeg", "gif", "webp", "bmp"],
        },
      ],
    });

    if (filePath) {
      const assetUrl = convertFileSrc(filePath);
      setImageSrc(assetUrl);
    }
  };

  return (
    <div className={styles.app}>
      <Header onOpenImage={handleOpenImage} />
      <main className={styles.main}>
        <ImagePreview src={imageSrc} />
      </main>
    </div>
  );
}

export default App;
