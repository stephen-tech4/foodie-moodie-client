import clsx from "clsx";
import { Section as MenuSection } from "../interfaces/Section";
import ItemCard from "./ItemCard";
import Section from "./Section";
import { Item } from "../interfaces/Item";

interface MenuSectionsProps {
  menuSection: MenuSection | null;
  isMenuAvailable: boolean;
  onItemClick: (item: Item) => void;
}

const MenuSectionGrid = ({
  menuSection,
  isMenuAvailable,
  onItemClick,
}: MenuSectionsProps) => {
  return (
    <Section
      id={`section-${menuSection?.label}`}
      className={clsx("sm:col-start-2 sm:col-span-3 space-y-4", {
        "opacity-50": !isMenuAvailable,
      })}
    >
      <p className="font-semibold text-xl">{menuSection?.label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menuSection && menuSection.items.length > 0 ? (
          menuSection?.items.map((item) => {
            return (
              <ItemCard
                key={`item-${item.label}`}
                sectionItem={item}
                isMenuAvailable={isMenuAvailable}
                onItemClick={onItemClick}
              />
            );
          })
        ) : (
          <p className="col-span-3">No items yet.</p>
        )}
      </div>
    </Section>
  );
};

export default MenuSectionGrid;
