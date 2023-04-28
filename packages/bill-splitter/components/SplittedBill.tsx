import React from 'react'
import { AnalyzedItem } from '@/types/analyzedItem';
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
  

export default function SplittedBill() {
    
  return (

    <div>SplittedBill</div>
  )
}
