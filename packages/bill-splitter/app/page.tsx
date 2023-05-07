'use client';
import CameraComponent from '@/components/Camera';
import ItemList from '@/components/SplittedBill';
import PayersComponent from '@/components/Payers/PayersComponent';
import { useBillStore } from '@/store/billStore';

export default function Home() {
  const setAnalyzedItems = useBillStore(state => state.setAnalyzedItems);

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
        // TODO add a numberOfConsumers property to each item
        setAnalyzedItems(data.items);
      })
      .catch(error => console.error(error));
  };

  return (
    <main className="h-screen w-full">
      <div className="mx-8 my-4">
        <PayersComponent />
      </div>
      <div className="mx-8">
        <CameraComponent onAnalyzeExpense={handleAnalyzeExpense} />
      </div>
      <div>
        <ItemList />
      </div>
    </main>
  );
}
