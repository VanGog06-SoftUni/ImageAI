import { useCallback, useState } from "react";

import { convertFileSrc } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";

const IMAGE_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "bmp"];

export function useImageLoader() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const openImage = useCallback(async () => {
    setIsLoading(true);
    try {
      const filePath = await open({
        multiple: false,
        directory: false,
        filters: [
          {
            name: "Images",
            extensions: IMAGE_EXTENSIONS,
          },
        ],
      });

      if (filePath) {
        const assetUrl = convertFileSrc(filePath);
        setImageSrc(assetUrl);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearImage = useCallback(() => {
    setImageSrc(null);
  }, []);

  return {
    imageSrc,
    isLoading,
    openImage,
    clearImage,
  };
}
