import * as React from "react";
import Button from "../../../admin/src/components/UI/Button";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                                 isOpen,
                                                                 onClose,
                                                                 onConfirm,
                                                                 message,
                                                             }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl border w-[90%] max-w-md relative">

                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                    onClick={onClose}
                >
                    ×
                </button>

                <h3 className="text-lg font-semibold text-gray-900">Please confirm</h3>

                <p className="text-gray-600 mt-2">{message}</p>

                <div className="flex justify-between gap-3 mt-6">
                    <Button onClick={onClose} variant="outline" size="sm">
                        CLOSE
                    </Button>
                    <Button onClick={onConfirm} variant="danger" size="sm">
                        SUBMIT
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;




