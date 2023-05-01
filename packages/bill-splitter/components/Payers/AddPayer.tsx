import { useState } from 'react';

type addPayerProps = {
  onAddPayer: (name: string) => void;
};
const AddPayer = ({ onAddPayer }: addPayerProps) => {
  const [name, setName] = useState('');

  const handleAddPayer = () => {
    onAddPayer(name);
    setName('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddPayer();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="name" className="block align-baseline text-gray-700 font-bold mb-2">
        Nome
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id="name"
          value={name}
          onChange={event => setName(event.target.value)}
          placeholder="Insira aqui"
          className="appearance-none w-full bg-gray-100 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default AddPayer;
