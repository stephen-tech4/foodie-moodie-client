import { useCallback, useEffect, useState } from "react";
import { Menu } from "../interfaces/Menu";
import MenuNavigationTab from "./MenuNavigationTab";
import MenuSectionSidebar from "./MenuSectionSidebar";
import Section from "./Section";
import { Section as MenuSection } from "../interfaces/Section";
import MenuSectionGrid from "./MenuSectionGrid";
import { Item } from "../interfaces/Item";
import { AnimatePresence } from "framer-motion";
import ItemModal from "./ItemModal";

interface FoodMenuProps {
  menu?: Menu;
  category: string;
  setCategory: (category: string) => void;
}

const FoodMenu = ({ menu, category, setCategory }: FoodMenuProps) => {
  const [menuSection, setMenuSection] = useState<MenuSection | null>(
    menu?.sections[0] || null,
  );

  const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => {
    setItem(item);
    onModalOpen();
  };

  const onModalOpen = () => setIsItemModalOpen(true);
  const onModalClose = () => setIsItemModalOpen(false);

  useEffect(() => {
    setMenuSection(menu?.sections[0] || null);
  }, [menu]);

  // Click on the sidebar to scroll to the menu section
  const handleSectionClick = (sectionId: string) => {
    document
      .getElementById(`section-${sectionId}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // When scrolling the page, keep track of the menu section in view
  const handleScroll = useCallback(() => {
    const menuSections = menu?.sections || [];
    menuSections.forEach((menuSection) => {
      const targetSection = document.getElementById(
        `section-${menuSection.label}`,
      );
      const rect = targetSection?.getBoundingClientRect();
      const isInView =
        rect && rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isInView) {
        setMenuSection(menuSection);
      }
    });
  }, [menu?.sections]);

  // Register the scroll tracker
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const isMenuAvailable = menu?.state === "ACTIVE";

  return (
    <Section className="relative space-y-4 pt-0">
      <div className="flex justify-center">
        <MenuNavigationTab category={category} setCategory={setCategory} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MenuSectionSidebar
          menu={menu}
          menuSection={menuSection}
          onSectionClick={handleSectionClick}
        />

        {menu?.sections.map((s) => {
          return (
            <MenuSectionGrid
              key={`menu-section-${s.label}`}
              menuSection={s}
              isMenuAvailable={isMenuAvailable}
              onItemClick={handleItemClick}
            />
          );
        })}
      </div>

      {/* Learn from https://www.youtube.com/watch?v=SuqU904ZHA4 */}
      <AnimatePresence>
        {isItemModalOpen && item && (
          <ItemModal
            item={item}
            isMenuAvailable={isMenuAvailable}
            onClose={onModalClose}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default FoodMenu;
