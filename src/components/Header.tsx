import styles from "./Header.module.css";

interface HeaderProps {
  onOpenImage: () => void;
  onGrayscale: () => void;
  isGrayscaleDisabled: boolean;
}

export default function Header({
  onOpenImage,
  onGrayscale,
  isGrayscaleDisabled,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ImageAI</h1>
      <div className={styles.actions}>
        <button className={styles.openButton} onClick={onOpenImage}>
          Open Image
        </button>
        <button
          className={styles.openButton}
          onClick={onGrayscale}
          disabled={isGrayscaleDisabled}
        >
          Grayscale
        </button>
      </div>
    </header>
  );
}
