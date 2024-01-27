import { Item } from "./Item";

export interface Section {
  id: string;
  label: string;
  description?: string;
  displayOrder: number;
  items: Item[];
}
