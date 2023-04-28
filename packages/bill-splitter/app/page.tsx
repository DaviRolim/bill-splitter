"use client"
import CameraComponent from '@/components/Camera';
import AddFriend from '@/components/AddFriend';
import { useState } from 'react';
import FriendList from '@/components/FriendList';
import { AnalyzedItem } from '@/types/analyzedItem';
import ItemList from '@/components/SplittedBill';

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
  
type Friend = {
  name: string;
  totalExpense: number;
};


export default function Home() {
  const [friends, setFriends] = useState<Friend[]>([]);

  const handleAddFriend = (name: string) => {
    setFriends([...friends, { name, totalExpense: 0 }]);
  };

  const handleDeleteFriend = (name: string) => {
    const updatedFriends = friends.filter(
      (friend) => friend.name !== name
    );
    setFriends(updatedFriends);
  };
  return (
    <main className='h-screen w-full'>
      <div className='flex flex-col gap-4 justify-center mx-2 my-8'>
          <AddFriend onAddFriend={handleAddFriend}  />
          <FriendList onDeleteFriend={handleDeleteFriend} friends={friends} />
      </div>
      <div className='mx-8'>
        <CameraComponent />
      </div>
      <div>
      <ItemList items={items} friends={friends} />
      </div>
    </main>
  )
}
