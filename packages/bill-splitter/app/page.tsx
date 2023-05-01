'use client';
import CameraComponent from '@/components/Camera';
import AddPayer from '@/components/Payers/AddPayer';
import { useEffect, useState } from 'react';
import PayerList from '@/components/Payers/PayerList';
import { AnalyzedItem } from '@/types/analyzedItem';
import ItemList from '@/components/SplittedBill';
import { Consumer, Payer, ItemWithParticipants } from '@/types/common';
import PayersComponent from '@/components/Payers/PayersComponent';

const items: AnalyzedItem[] = [
  {
    quantity: 1,
    name: 'Spaghetti Carbonara',
    unitPrice: 12.99,
    price: 12.99,
  },
  {
    quantity: 2,
    name: 'Caesar Salad',
    unitPrice: 8.99,
    price: 17.98,
  },
  {
    quantity: 1,
    name: 'New York Steak',
    unitPrice: 24.99,
    price: 24.99,
  },
  {
    quantity: 1,
    name: 'Chicken Alfredo',
    unitPrice: 15.99,
    price: 15.99,
  },
  {
    quantity: 3,
    name: 'Garlic Bread',
    unitPrice: 3.99,
    price: 11.97,
  },
];

export default function Home() {
  const [payers, setPayers] = useState<Payer[]>([]);
  const [itemsWithParticipants, setItemsWithParticipants] = useState<
    ItemWithParticipants[]
  >([]);
  const [analyzedItems, setAnalyzedItems] = useState<AnalyzedItem[]>([]);

  useEffect(() => {
    const itemsConsumers: ItemWithParticipants[] = items.map(item => ({
      ...item,
      consumers: payers.map(payer => {
        return {
          name: payer.name,
          consumed: false, // TODO this could cause bug because when we add a new payer, all other payers will have consumed: false even if they already changed to true/
          totalPay: 0,
        };
      }),
    }));
    setItemsWithParticipants(itemsConsumers);
  }, [analyzedItems, payers]);

  const handleCheckItemConsumed = (item: ItemWithParticipants, consumer: Consumer) => {
    const updatedItems = itemsWithParticipants.map(itemWithParticipant => {
      if (itemWithParticipant.name === item.name) {
        // This loop could be avoided by using a unique id for each item, instead of looping, I could get the item by key and replace
        const updatedConsumers = itemWithParticipant.consumers.map(payer => {
          if (payer.name === consumer.name) {
            return {
              ...payer,
              consumed: !payer.consumed,
            };
          }
          return payer;
        });
        return {
          ...itemWithParticipant,
          consumers: updatedConsumers,
        };
      }
      return itemWithParticipant;
    });
    setItemsWithParticipants(updatedItems);
  };

  const handleAnalyzeExpense = (imageData: string | null) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!imageData || !apiUrl) return;
    console.log('apiUrl', apiUrl);
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: imageData,
    })
      .then(response => {
        console.log('response', response);
        return response.json();
      })
      .then(data => {
        console.log('AnalyzedItems', data);
        setAnalyzedItems(data.items);
      })
      .catch(error => console.error(error));
  };

  const handleAddPayer = (name: string) => {
    setPayers([...payers, { name, totalPay: 0 }]);
  };

  const handleDeletePayer = (name: string) => {
    const updatedPayers = payers.filter(payer => payer.name !== name);
    setPayers(updatedPayers);
  };
  return (
    <main className="h-screen w-full">
      <div className="mx-8 my-4">
        <PayersComponent
          onAddPayer={handleAddPayer}
          onDeletePayer={handleDeletePayer}
          payers={payers}
        />
      </div>
      <div className="mx-8">
        <CameraComponent onAnalyzeExpense={handleAnalyzeExpense} />
      </div>
      <div>
        <ItemList
          items={itemsWithParticipants}
          onHandleCheckItemConsumed={handleCheckItemConsumed}
        />
      </div>
    </main>
  );
}
