import React from 'react';
import { useState } from 'react';
import { AnalyzedItem } from '@/types/analyzedItem';
import { Consumer, Payer, ItemWithParticipants } from '@/types/common';
import { FcCancel, FcCheckmark } from 'react-icons/fc';

type Props = {
  items: ItemWithParticipants[];
  onHandleCheckItemConsumed: (
    itemWithParticipant: ItemWithParticipants,
    consumer: Consumer
  ) => void;
};

const ItemList: React.FC<Props> = ({ items, onHandleCheckItemConsumed }) => {
  const handlePayerSelect = (
    itemWithParticipant: ItemWithParticipants,
    consumer: Consumer
  ) => {};

  const calculateItemRatio = (itemWithParticipant: ItemWithParticipants) => {
    const consumers = itemWithParticipant.consumers.filter(consumer => consumer.consumed);
    return itemWithParticipant.price / consumers.length;
  };

  return (
    <div className="card mx-8 my-4">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-4 mb-8">
          <div>
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <div className="flex justify-between items-center">
              <div>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: {item.unitPrice}</p>
                <p>
                  Total Price: <span className="text-green-500">{item.price}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            {item.consumers.map((payer, payerIndex) => (
              <div key={payerIndex} className="flex items-center mr-4 mb-4">
                <button
                  onClick={() => onHandleCheckItemConsumed(item, payer)}
                  className={`rounded-full w-6 h-6 ${
                    payer.consumed ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                ></button>
                <label className="ml-2">{payer.name}</label>
                {item.consumers.filter(payer => payer.consumed).length > 0 &&
                  payer.consumed && (
                    <p className="ml-2 text-green-500">
                      {calculateItemRatio(item).toFixed(2)}
                    </p>
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
