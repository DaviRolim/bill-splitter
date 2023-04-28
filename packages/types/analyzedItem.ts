export type AnalyzedItem = {
    quantity: number;
    name: string;
    unitPrice: number;
    price: number;
}

// generate a mock list of AnalyzedItems for testing
const analyzedItems = [
    {
        quantity: 1,
        name: 'Item 1',
        unitPrice: 1.00,
        price: 1.00,
    },
    {
        quantity: 2,
        name: 'Item 2',
        unitPrice: 2.00,
        price: 4.00,
    },
    {
        quantity: 3,
        name: 'Item 3',
        unitPrice: 3.00,
        price: 9.00,
    },
    {
        quantity: 4,
        name: 'Item 4',
        unitPrice: 4.00,
        price: 16.00,
    },
    {
        quantity: 5,
        name: 'Item 5',
        unitPrice: 5.00,
        price: 25.00,
    },
    {
        quantity: 6,
        name: 'Item 6',
        unitPrice: 6.00,
        price: 36.00,
    },
    {
        quantity: 7,
        name: 'Item 7',
        unitPrice: 7.00,
        price: 49.00,
    }

]