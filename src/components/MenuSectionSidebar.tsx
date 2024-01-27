import { twMerge } from "tw-merge";
import { Menu } from "../interfaces/Menu";
import Section from "./Section";
import clsx from "clsx";
import { Section as MenuSection } from "../interfaces/Section";

interface MenuSectionSidebarProps {
  menu?: Menu;
  menuSection?: MenuSection | null;
  onSectionClick: (sectionId: string) => void;
}

const MenuSectionSidebar = ({
  menu,
  menuSection,
  onSectionClick,
}: MenuSectionSidebarProps) => {
  return (
    <Section className="sticky top-0 lg:col-start-1 lg:col-span-1 space-y-2">
      <p className="font-semibold text-center sm:text-left text-2xl">
        Our Menu
      </p>

      <ul className="select-none flex flex-row sm:flex-col text-lg overflow-x-scroll overflow-y-hidden sm:overflow-x-hidden sm:overflow-y-scroll">
        {menu?.sections.map((s) => {
          return (
            <li
              key={`section-${s.label}`}
              className={twMerge(
                clsx(
                  "border-b-2 sm:border-b-0 sm:border-l-2 p-1 cursor-pointer",
                  {
                    "border-orange-400": s.label === menuSection?.label,
                  },
                ),
              )}
            >
              <button
                type="button"
                className="outline-none ring-0 border-none p-1 hover:border-none focus:outline-none"
                onClick={() => {
                  onSectionClick(s.label);
                }}
              >
                {s.label}
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

export default MenuSectionSidebar;
