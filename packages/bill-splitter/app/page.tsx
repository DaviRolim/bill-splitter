"use client"
import CameraComponent from '@/components/Camera';
import AddFriend from '@/components/AddFriend';
import { useState } from 'react';
import FriendList from '@/components/FriendList';

type Friend = {
  name: string
}

export default function Home() {
  const [friends, setFriends] = useState<Friend[]>([]);

  const handleAddFriend = (name: string) => {
    setFriends([...friends, { name }]);
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
    </main>
  )
}
