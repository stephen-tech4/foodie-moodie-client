import { ModifierGroup } from "./ModifierGroup";

export interface Modifier {
  id: string;
  label: string;
  defaultQuantity: number;
  priceOverride: number;
  modifierGroup: ModifierGroup;
}
