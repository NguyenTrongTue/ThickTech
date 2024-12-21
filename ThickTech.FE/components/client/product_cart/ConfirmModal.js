import React from "react";
import ModalConfirm from "@/components/Modal";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  itemTitle,
}) {
  return (
    <ModalConfirm
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      message={message}
      itemTitle={itemTitle}
    />
  );
}
