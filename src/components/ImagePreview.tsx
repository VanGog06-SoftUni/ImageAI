import ImageIcon from "./icons/ImageIcon";
import styles from "./ImagePreview.module.css";

interface ImagePreviewProps {
  src: string | null;
  isProcessing?: boolean;
  processingText?: string;
}

export default function ImagePreview({
  src,
  isProcessing = false,
  processingText = "Processing...",
}: ImagePreviewProps) {
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
      {isProcessing && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <span>{processingText}</span>
        </div>
      )}
    </div>
  );
}
