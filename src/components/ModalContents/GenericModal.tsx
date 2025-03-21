import React, { useEffect } from "react";
import ModalButton from "../common/Button/Button";

interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerText: React.ReactNode;
  content: React.ReactNode;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onClose,
  headerText,
  content,
  confirmText,
  cancelText,
  onConfirm,
}) => {
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog" // 모달이 대화 상자임을 알림
      aria-modal="true" // 모달이 열렸을 때 다른 영역과의 상호작용 제한
      aria-labelledby="modal-title" // 모달의 제목을 참조
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 w-full max-w-sm p-6 bg-white rounded-lg">
        <h2 id="modal-title" className="mb-4 text-2xl font-bold text-left">
          {headerText}
        </h2>
        <div className="mb-6 text-left">{content}</div>
        <div className="flex justify-end mt-4 space-x-2">
          <ModalButton onClick={onClose} variant="secondary">
            {cancelText}
          </ModalButton>
          <ModalButton onClick={onConfirm} variant="primary">
            {confirmText}
          </ModalButton>
        </div>
      </div>
    </div>
  );
};

export default GenericModal;
