import { BaseModal } from '../BaseModal';

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="p-10 text-center">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          삭제하시겠습니까?
        </h2>
        <p className="mb-10 text-sm text-gray-400">
          작성한 정보가 모두 삭제됩니다.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-100 py-4 font-bold text-gray-500 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="x flex-1 rounded-xl bg-blue-500 py-4 font-bold text-white hover:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
