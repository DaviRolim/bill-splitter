import React from 'react';
import AddPayer from './AddPayer';
import PayerList from './PayerList';
import { Payer } from '@/types/common';

type PayersComponentProps = {
  onAddPayer: (name: string) => void;
  payers: Payer[];
  onDeletePayer: (name: string) => void;
};

export default function PayersComponent({
  onAddPayer,
  onDeletePayer,
  payers,
}: PayersComponentProps) {
  return (
    <div className="card">
      <div className="flex flex-col gap-4">
        <div className="text-2xl text-center font-semibold">
          Adicione aqui as pessoas que irao dividir a conta
        </div>
        <AddPayer onAddPayer={onAddPayer} />
        <PayerList onDeletePayer={onDeletePayer} payers={payers} />
      </div>
    </div>
  );
}
