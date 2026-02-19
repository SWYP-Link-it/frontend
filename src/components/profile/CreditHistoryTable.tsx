import { formatCreditDate } from '@/src/utils/date';
import Image from 'next/image';

export const CreditHistoryTable = ({
  transactions,
}: {
  transactions: any[];
}) => {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-gray-100">
      <table className="w-full text-center text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
            <th className="px-6 py-4">상대방</th>
            <th className="px-6 py-4">항목 / 스킬명</th>
            <th className="px-6 py-4">일시</th>
            <th className="px-6 py-4 text-center">상태</th>
            <th className="px-6 py-4 text-right">크레딧</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {transactions.map((tx) => {
            const isPlus = tx.changeAmount > 0;
            const isSystem =
              !tx.targetNickname || tx.targetNickname === '시스템';

            return (
              <tr
                key={tx.creditHistoryId}
                className="group transition-all duration-200 hover:bg-gray-50/80"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-100 bg-white transition-transform group-hover:scale-105 ${
                        isSystem ? 'bg-brand-50/30' : ''
                      }`}
                    >
                      {isSystem ? (
                        <span className="text-brand-600 text-[10px] font-bold">
                          SYS
                        </span>
                      ) : (
                        <Image
                          src="/icons/avatar.svg"
                          alt="profile"
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </div>
                    <span
                      className={`text-[13px] font-semibold ${isSystem ? 'text-gray-500' : 'text-gray-900'}`}
                    >
                      {tx.targetNickname || '시스템'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[13px] font-medium text-gray-700">
                    {tx.contentName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[12px] text-gray-400">
                    {formatCreditDate(tx.createdAt)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold tracking-tight text-gray-500`}
                  >
                    {tx.statusLabel}
                  </span>
                </td>
                <td className={`px-6 py-4 text-right tabular-nums`}>
                  <span
                    className={`text-base font-bold ${isPlus ? 'text-brand-600' : 'text-gray-900'}`}
                  >
                    {isPlus ? `+${tx.changeAmount}` : tx.changeAmount}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-gray-300">
          <p className="text-sm font-medium">거래 내역이 존재하지 않습니다.</p>
        </div>
      )}
    </div>
  );
};
