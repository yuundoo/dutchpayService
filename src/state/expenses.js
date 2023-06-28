import { atom } from 'recoil';

export const expenseState = atom({
   key: 'expenses',
   default: [],
});
