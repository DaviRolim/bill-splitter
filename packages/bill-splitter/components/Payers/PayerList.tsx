import { useBillStore } from '@/store/billStore';
import { AnalyzedItem } from '@/types/analyzedItem';
import React from 'react';
import { MdDeleteForever } from 'react-icons/md';

export default function PayerList() {
  const payers = useBillStore(state => state.billParticipants);
  const removeBillParticipant = useBillStore(state => state.removeBillParticipant);
  const analyzedItems = useBillStore(state => state.analyzedItems);
  const handleDeletePayer = (name: string) => {
    removeBillParticipant(name);
  };
  for (const payer of payers) {
    console.log('payer.name', payer.name);
    console.log('payer.items', payer.items);
  }
  const getItemSplitValue = (item: AnalyzedItem) => {
    const itemIndex = analyzedItems.findIndex(stateItem => item.name === stateItem.name);
    return analyzedItems[itemIndex].price / analyzedItems[itemIndex].numberOfConsumers;
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
                  {payer.name}{' '}
                  {payer.items
                    .reduce((acc, item) => acc + getItemSplitValue(item), 0)
                    .toFixed(2)}
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
