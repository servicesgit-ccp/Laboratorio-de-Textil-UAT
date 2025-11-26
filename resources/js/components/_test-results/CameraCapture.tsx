import React, { useEffect, useRef, useState } from 'react';
import IconifyIcon from '@/components/wrappers/IconifyIcon';

type CameraCaptureProps = {
  inputId?: string;
  multiple?: boolean;
  helperText?: string;
  error?: string | null;
  initialImages?: string[]; // URLs ya guardadas (opcional)
  onFilesChange: (files: File[]) => void;
};

const CameraCapture: React.FC<CameraCaptureProps> = ({
  inputId = 'camera-input',
  multiple = true,
  helperText = 'Toca el botón para abrir la cámara o seleccionar fotos.',
  error,
  initialImages = [],
  onFilesChange,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [savedImages] = useState<string[]>(initialImages);

  // Ref al input oculto
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    fileInputRef.current?.click();
  };

  // Maneja el cambio de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onFilesChange(files);

    // Previews locales
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  // Limpiar URLs cuando cambian los previews o se desmonta
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="d-flex flex-column align-items-center w-100">

      {/* input de archivo oculto */}
      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple={multiple}
        className="d-none"
        onChange={handleFileChange}
      />

      {/* Botón circular de cámara */}
      <button
        type="button"
        className="btn btn-dark rounded-circle p-3 d-flex align-items-center justify-content-center"
        onClick={openPicker}
      >
        <IconifyIcon icon="tabler:camera" className="fs-3" />
      </button>

      {/* Texto de ayuda */}
      {helperText && (
        <div className="text-muted small mt-2 text-center">
          {helperText}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-danger small mt-1">
          {error}
        </div>
      )}

      {/* Previews nuevas */}
      {previews.length > 0 && (
        <div className="w-100 mt-3">
          <div className="mb-2 fw-semibold small">Fotos nuevas</div>
          <div className="row g-2">
            {previews.map((src, idx) => (
              <div className="col-4 col-md-2" key={idx}>
                <div className="border rounded-4 overflow-hidden">
                  <img
                    src={src}
                    alt={`preview-${idx}`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Imágenes ya guardadas (opcionales) */}
      {savedImages.length > 0 && (
        <div className="w-100 mt-3">
          <div className="mb-2 fw-semibold small">Fotos guardadas</div>
          <div className="row g-2">
            {savedImages.map((url, idx) => (
              <div className="col-4 col-md-2" key={idx}>
                <div className="border rounded-4 overflow-hidden">
                  <img
                    src={url}
                    alt={`saved-${idx}`}
                    className="img-fluid"
                    style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default CameraCapture;
