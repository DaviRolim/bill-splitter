import { AnalyzedItem } from './analyzedItem';

// TODO. The payer should be the first class citizen in this app
// So we wouldn't need teh Consumer type
// We can store the Items that the payer consumed in the payer object
// So that is easier to calculate the total
// By looping through the items that the payer consumed
// and dividing each total price by the number of consumers the item have.

export type Payer = {
  name: string;
  totalPay: number;
};

export type Consumer = Payer & {
  consumed: boolean;
};

export type ItemWithParticipants = AnalyzedItem & {
  consumers: Consumer[];
};
