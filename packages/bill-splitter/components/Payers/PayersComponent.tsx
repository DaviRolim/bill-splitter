import React from 'react';
import AddPayer from './AddPayer';
import PayerList from './PayerList';

export default function PayersComponent() {
  return (
    <div className="card">
      <div className="flex flex-col gap-4">
        <div className="text-2xl text-center font-semibold">
          Adicione aqui as pessoas que irao dividir a conta
        </div>
        <AddPayer />
        <PayerList />
      </div>
    </div>
  );
}
