import React from 'react';
import { useState } from 'react';
import { AnalyzedItem } from '@/types/analyzedItem';
import { Consumer, Payer, ItemWithParticipants } from '@/types/common';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { useBillStore } from '@/store/billStore';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { BillParticipant } from '@/types/BillParticipant';

const ItemList = () => {
  const [payers, analyzedItems, addItemConsumed, removeItemConsumed] = useBillStore(
    state => [
      state.billParticipants,
      state.analyzedItems,
      state.addItemConsumed,
      state.removeItemConsumed,
    ]
  );
  const calculateItemRatio = (analyzedItem: AnalyzedItem) => {
    return analyzedItem.price / analyzedItem.numberOfConsumers;
  };

  const payerHasConsumed = (payer: BillParticipant, item: AnalyzedItem) => {
    return payer.items.some(consumedItem => consumedItem.name === item.name);
  };

  return (
    <div className="card mx-8 my-4">
      {analyzedItems.map((item, index) => (
        <div key={index} className="flex flex-col gap-4 mb-8">
          <div>
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <div className="flex justify-between items-center">
              <div>
                <p>Quantidade: {item.quantity}</p>
                <p>Preco unitario: {item.unitPrice}</p>
                <p>
                  Preco Total: <span className="text-green-500">{item.price}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            {payers.map((payer, payerIndex) => (
              <div key={payerIndex} className="flex items-center mr-4 mb-4">
                <label className="ml-1">{payer.name}</label>
                {payerHasConsumed(payer, item) && (
                  <MdCheckBox
                    className="ml-2 text-green-500"
                    size={25}
                    onClick={() => removeItemConsumed(payer, item)}
                  />
                )}
                {!payerHasConsumed(payer, item) && (
                  <MdCheckBoxOutlineBlank
                    className="ml-2 text-pink-500"
                    size={25}
                    onClick={() => addItemConsumed(payer, item)}
                  />
                )}
                {item.numberOfConsumers > 0 && payerHasConsumed(payer, item) && (
                  <p>{calculateItemRatio(item).toFixed(2)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
