import { Payer } from '@/types/common';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

type PayerListProps = {
  payers: Payer[];
  onDeletePayer: (name: string) => void;
};

export default function PayerList({ payers, onDeletePayer }: PayerListProps) {
  const handleDeletePayer = (name: string) => {
    onDeletePayer(name);
  };
  return (
    <div className="block">
      {payers.length > 0 && (
        <div className="flex flex-col">
          <h3 className="text-gray-700 font-bold mb-2">Pagadores</h3>
          <ul>
            {payers.map(payer => (
              <div key={payer.name} className="flex justify-between mb-2">
                <li className="text-xl">
                  {payer.name} {payer.totalPay}
                </li>
                <MdDeleteForever
                  className="text-red-600"
                  onClick={() => handleDeletePayer(payer.name)}
                  size={30}
                />
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
