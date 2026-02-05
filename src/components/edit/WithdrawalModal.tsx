import { BaseModal } from '../BaseModal';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const WithdrawalModal = ({
  isOpen,
  onClose,
  onConfirm,
}: WithdrawalModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <div className="flex flex-col items-center p-10 text-center">
        <h2 className="mb-3 text-xl font-bold text-gray-900">
          정말 탈퇴하시겠어요?
        </h2>
        <p className="mb-10 text-sm text-gray-400">
          보유하신 크레딧과 활동 내역이 전부 사라집니다.
        </p>

        <div className="flex w-full gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 py-4 font-bold text-gray-500 transition-colors hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-blue-500 py-4 font-bold text-white shadow-lg shadow-blue-100 transition-colors hover:bg-blue-600"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
