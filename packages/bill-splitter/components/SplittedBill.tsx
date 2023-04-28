import React from 'react'
import { useState } from "react";
import { AnalyzedItem } from '@/types/analyzedItem';

  
  
  type Props = {
    items: AnalyzedItem[];
    friends: Friend[];
  };
  
  type Friend = {
    name: string;
    totalExpense: number;
  };
  
  const ItemList: React.FC<Props> = ({ items, friends }) => {
    const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  
    const handleFriendSelect = (friend: Friend, index: number) => {
      // copy the selectedFriends array to avoid mutating state directly
      const updatedSelectedFriends = [...selectedFriends];
      // toggle the friend's selection status
      updatedSelectedFriends[index] = {
        ...friend,
        isSelected: !friend.isSelected,
      };
      setSelectedFriends(updatedSelectedFriends);
    };
  
    const calculateFriendExpenses = (friend: Friend) => {
      // calculate the total expense for the selected items
      // return items.reduce((total, item) => {
      //   const itemTotal = item.price / items.length;
      //   if (item.friends.includes(friend.name)) {
      //     return total + itemTotal;
      //   }
      //   return total;
      // }, 0);
    };
  
    return (
      <div>
        {items.map((item, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-bold text-lg mb-2">{item.name}</h2>
            <div className="flex justify-between">
              <div>
                <p>Quantity: {item.quantity}</p>
                <p>Unit Price: {item.unitPrice}</p>
                <p>Total Price: {item.price}</p>
              </div>
              <div>
                {friends.map((friend, friendIndex) => (
                  <div key={friendIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      // checked={
                      //   // selectedFriends[friendIndex]?.isSelected ?? false
                      // }
                      onChange={() => handleFriendSelect(friend, friendIndex)}
                      className="mr-2"
                    />
                    <label>{friend.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Friend Expenses</h2>
          {friends.map((friend, index) => (
            <div key={index}>
              <p>{friend.name}: {/*{calculateFriendExpenses(friend)}*/}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ItemList;
  
