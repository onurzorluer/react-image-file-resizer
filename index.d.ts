declare module "react-image-file-resizer" {
  class Resizer {
    static changeHeightWidth(
      height: number,
      maxHeight: number,
      width: number,
      maxWidth: number,
      minWidth: number,
      minHeight: number
    ): { height: number; width: number };

    static resizeAndRotateImage(
      image: HTMLImageElement,
      maxWidth: number,
      maxHeight: number,
      minWidth: number,
      minHeight: number,
      compressFormat?: string,
      quality?: number,
      rotation?: number
    ): string;

    static b64toBlob(b64Data: string, contentType: string): Blob;
    static b64toFile(b64Data: string, fileName: string, contentType: string): File;

    static createResizedImage<TOut extends "blob" | "base64" | "file">(
      file: Blob,
      maxWidth: number,
      maxHeight: number,
      compressFormat: "JPEG" | "PNG" | "WEBP",
      quality: number,
      rotation: number,
      responseUriFunc: (
        value: TOut extends "blob" ? Blob : TOut extends "file" ? File : string
      ) => void,
      outputType?: TOut,
      minWidth?: number,
      minHeight?: number
    ): void;
  }

  const FileResizer: { imageFileResizer: typeof Resizer.createResizedImage };

  export default FileResizer;
}
