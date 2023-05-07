// store using zustand
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AnalyzedItem } from '../types/analyzedItem';
import { BillParticipant } from '../types/BillParticipant';
import { items } from './mockInitialData';

type State = {
  analyzedItems: AnalyzedItem[];
  billParticipants: BillParticipant[];
};

type Actions = {
  addItemConsumed: (billParticipant: BillParticipant, item: AnalyzedItem) => void;
  removeItemConsumed: (billParticipant: BillParticipant, item: AnalyzedItem) => void;
  addBillParticipant: (name: string) => void;
  removeBillParticipant: (name: string) => void;
  setAnalyzedItems: (analyzedItems: AnalyzedItem[]) => void;
};

const initialState: State = {
  analyzedItems: items,
  billParticipants: [],
};

export const useBillStore = create(
  immer<State & Actions>(set => ({
    ...initialState,
    addBillParticipant: (name: string) => {
      set(state => ({
        billParticipants: [
          ...state.billParticipants,
          {
            name,
            items: [],
          },
        ],
      }));
    },
    addItemConsumed: (billParticipant: BillParticipant, item: AnalyzedItem) => {
      set(state => {
        const participantIndex = state.billParticipants.findIndex(
          participant => participant.name === billParticipant.name
        );

        const itemIndex = state.analyzedItems.findIndex(
          analyzedItem => analyzedItem.name === item.name
        );
        state.analyzedItems[itemIndex].numberOfConsumers =
          state.analyzedItems[itemIndex].numberOfConsumers + 1;

        state.billParticipants[participantIndex].items.push(
          state.analyzedItems[itemIndex]
        );
      });
    },
    removeItemConsumed: (billParticipant: BillParticipant, item: AnalyzedItem) => {
      set(state => {
        const participantIndex = state.billParticipants.findIndex(
          participant => participant.name === billParticipant.name
        );
        const itemParticipantIndex = state.billParticipants[
          participantIndex
        ].items.findIndex(consumedItem => consumedItem.name === item.name);
        state.billParticipants[participantIndex].items.splice(itemParticipantIndex, 1);

        const itemIndex = state.analyzedItems.findIndex(
          analyzedItem => analyzedItem.name === item.name
        );
        state.analyzedItems[itemIndex].numberOfConsumers =
          state.analyzedItems[itemIndex].numberOfConsumers - 1;
      });
    },
    setAnalyzedItems: (analyzedItems: AnalyzedItem[]) => {
      set(state => {
        state.analyzedItems = analyzedItems;
      });
    },
    removeBillParticipant: (name: string) => {
      set(state => {
        const participantIndex = state.billParticipants.findIndex(
          participant => participant.name === name
        );
        state.billParticipants.splice(participantIndex, 1);
        for (const item of state.billParticipants[participantIndex].items) {
          const itemIndex = state.analyzedItems.findIndex(
            analyzedItem => analyzedItem.name === item.name
          );
          state.analyzedItems[itemIndex].numberOfConsumers =
            state.analyzedItems[itemIndex].numberOfConsumers - 1;
        }
      });
    },
  }))
);
