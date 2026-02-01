import { useCallback, useState } from "react";

import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];

export function useImageLoader() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const openImage = useCallback(async () => {
    setIsLoading(true);
    try {
      const selectedPath = await open({
        multiple: false,
        directory: false,
        filters: [
          {
            name: "Images",
            extensions: IMAGE_EXTENSIONS,
          },
        ],
      });

      if (selectedPath) {
        const assetUrl = convertFileSrc(selectedPath);
        setImageSrc(assetUrl);
        setFilePath(selectedPath);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyGrayscale = useCallback(async () => {
    if (!filePath) return;

    setIsProcessing(true);
    try {
      const outputPath = await invoke<string>("convert_to_grayscale", {
        path: filePath,
      });
      const assetUrl = convertFileSrc(outputPath);
      setImageSrc(assetUrl);
      setFilePath(outputPath);
    } catch (error) {
      alert(`Failed to apply grayscale: ${error}`);
    } finally {
      setIsProcessing(false);
    }
  }, [filePath]);

  const clearImage = useCallback(() => {
    setImageSrc(null);
    setFilePath(null);
  }, []);

  return {
    imageSrc,
    filePath,
    isLoading,
    isProcessing,
    openImage,
    applyGrayscale,
    clearImage,
  };
}
