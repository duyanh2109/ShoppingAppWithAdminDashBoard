"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../UI/modal";
export const StoreModal = () => {
  const StoreModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="add a new store to magnage product and categorize"
      isOpen={StoreModal.isOpen}
      onClose={StoreModal.onClose}
    >
      Future Create Store form
    </Modal>
  );
};
