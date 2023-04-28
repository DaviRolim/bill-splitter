import React from 'react'

type Friend = {
  name: string
}

type FriendListProps = {
    friends: Friend[]
    onDeleteFriend: (name: string) => void;
};

export default function FriendList({friends, onDeleteFriend}: FriendListProps) {
  const handleDeleteFriend = (name: string) => {
    onDeleteFriend(name);
  };
  return (
    <div className='block'>
     {friends.length > 0 && (
        <div className="flex flex-col">
          <h3 className="text-gray-700 font-bold mb-2">Friends</h3>
          <ul>
            {friends.map((friend) => (
              <div key={friend.name} className="flex justify-between">
                <li  className="mb-2">
                    {friend.name}
                    <button
                    onClick={() => handleDeleteFriend(friend.name)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                    >
                    Delete
                    </button>
              </li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
