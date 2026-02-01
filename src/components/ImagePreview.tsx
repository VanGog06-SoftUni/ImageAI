import ImageIcon from "./icons/ImageIcon";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  src: string | null;
}

export default function ImagePreview({ src }: ImagePreviewProps) {
  if (!src) {
    return (
      <div className={styles.placeholder}>
        <ImageIcon className={styles.icon} />
        <p className={styles.placeholderText}>Open an image to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.previewContainer}>
      <img src={src} alt="Preview" className={styles.image} />
    </div>
  );
}
