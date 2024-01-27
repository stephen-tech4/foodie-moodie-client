import { Section } from "./Section";

/**
 * Menu properties
 * @param string id
 * @param string label
 * @param string startDate
 * @param string endDate
 * @param string state
 * @param Section[] sections
 */
export interface Menu {
  id: string;
  label: string;
  startDate: string;
  endDate?: string;
  state: string;
  sections: Section[];
}
