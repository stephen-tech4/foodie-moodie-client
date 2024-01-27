import clsx from "clsx";
import { Item, Item as SectionItem } from "../interfaces/Item";
import Section from "./Section";

interface ItemCardProps {
  sectionItem: SectionItem;
  isMenuAvailable: boolean;
  onItemClick: (item: Item) => void;
}

const ItemCard = ({
  sectionItem,
  isMenuAvailable,
  onItemClick,
}: ItemCardProps) => {
  return (
    <div
      className="flex flex-col bg-white rounded-md shadow-lg overflow-hidden"
      onClick={() => onItemClick(sectionItem)}
    >
      <div className="flex-shrink-0">
        <div className="relative overflow-hidden pt-[100%]">
          <img
            className="absolute top-0 object-cover transform transition-transform hover:scale-125"
            src={`../../${sectionItem.label
              .replace(/\s+/g, "-")
              .toLowerCase()}.jpeg`}
            alt={sectionItem.label}
          />
          <p className="text-gray-200 text-xs absolute bottom-0 right-0">
            Taken from Internet
          </p>
        </div>
      </div>

      <Section className="space-y-4 p-2">
        <p className="font-semibold">{sectionItem.label}</p>

        <p className="line-clamp-3 text-sm">{sectionItem.description}</p>

        <div className="flex flex-row justify-between items-center">
          <p className="text-sm">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(sectionItem.price)}
          </p>
          <button
            type="button"
            className={clsx(
              "outline-none ring-0 border-none hover:border-none focus:outline-none bg-orange-500 text-white text-sm font-bold",
              {
                "cursor-not-allowed opacity-50":
                  !isMenuAvailable || sectionItem.isSoldOut,
              },
            )}
            disabled={!isMenuAvailable}
            onClick={() => onItemClick(sectionItem)}
          >
            {isMenuAvailable
              ? sectionItem.isSoldOut
                ? "Sold out"
                : "Add"
              : "Not Available"}
          </button>
        </div>
      </Section>
    </div>
  );
};

export default ItemCard;
