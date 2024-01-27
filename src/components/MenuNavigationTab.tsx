import clsx from "clsx";
import { twMerge } from "tw-merge";

interface MenuNavigationTab {
  category: string;
  setCategory: (category: string) => void;
}

const MenuNavigationTab = ({ category, setCategory }: MenuNavigationTab) => {
  return (
    <ul className="select-none flex gap-8 text-lg overflow-x-scroll">
      <li
        className={twMerge(
          clsx(
            "group flex flex-col items-center cursor-pointer border-b-4 border-b-transparent",
            {
              "border-orange-400": category === "Pizza",
              "hover:border-orange-200": category !== "Pizza",
            },
          ),
        )}
      >
        <button
          type="button"
          className="outline-none ring-0 border-none hover:border-none focus:outline-none"
          onClick={() => setCategory("Pizza")}
        >
          Pizza
        </button>
      </li>

      <li
        className={twMerge(
          clsx(
            "group flex flex-col items-center cursor-pointer border-b-4 border-b-transparent",
            {
              "border-orange-400": category === "Spaghetti",
              "hover:border-orange-200": category !== "Spaghetti",
            },
          ),
        )}
      >
        <button
          type="button"
          className="outline-none ring-0 border-none hover:border-none focus:outline-none"
          onClick={() => setCategory("Spaghetti")}
        >
          Spaghetti
        </button>
      </li>

      <li
        className={twMerge(
          clsx(
            "group flex flex-col items-center cursor-pointer border-b-4 border-b-transparent",
            {
              "border-orange-400": category === "Chinese New Year Deals",
              "hover:border-orange-200": category !== "Chinese New Year Deals",
            },
          ),
        )}
      >
        <button
          type="button"
          className="outline-none ring-0 border-none hover:border-none focus:outline-none"
          onClick={() => setCategory("Chinese New Year Deals")}
        >
          CNY Deals
        </button>
      </li>
    </ul>
  );
};

export default MenuNavigationTab;
