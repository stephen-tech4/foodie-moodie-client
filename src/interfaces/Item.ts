import { Modifier } from "./Modifier";

export interface Item {
  id: string;
  type: string;
  label: string;
  description?: string;
  price: number;
  quantity: number;
  isSoldOut: boolean;
  modifiers: Modifier[];
}
