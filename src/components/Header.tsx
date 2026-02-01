import styles from "./Header.module.css";

interface HeaderProps {
  onOpenImage: () => void;
}

export default function Header({ onOpenImage }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ImageAI</h1>
      <button className={styles.openButton} onClick={onOpenImage}>
        Open Image
      </button>
    </header>
  );
}
