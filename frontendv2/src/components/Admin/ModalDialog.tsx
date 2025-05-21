import { Dialog } from "@headlessui/react";
import React from "react";

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ isOpen, onClose, title, children }) => (
  <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <Dialog.Title className="text-lg font-bold mb-4 border-b pb-2">{title}</Dialog.Title>
        {children}
        <div className="mt-4 text-right">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onClose}>
            Close
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default ModalDialog;
