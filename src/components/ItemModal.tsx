import { useState } from "react";
import { Item } from "../interfaces/Item";
import Modal from "./Modal";
import clsx from "clsx";

interface ItemModalProps {
  item: Item;
  isMenuAvailable: boolean;
  onClose: () => void;
}

interface ModifierInputProps {
  id: string;
  label: string;
  quantity: number;
  selectionRequiredMin: number;
  selectionRequiredMax: number;
  priceOverride: number;
}

const ItemModal = ({ item, isMenuAvailable, onClose }: ItemModalProps) => {
  const canAdditem = isMenuAvailable && !item.isSoldOut;
  const [modifierInputs, setModifierInputs] = useState<ModifierInputProps[]>(
    item.modifiers.map((m) => ({
      id: m.id,
      label: m.label,
      quantity: canAdditem ? m.defaultQuantity : 0,
      selectionRequiredMin: m.modifierGroup.selectionRequiredMin,
      selectionRequiredMax: m.modifierGroup.selectionRequiredMax,
      priceOverride: m.priceOverride,
    })),
  );
  const [itemQuantity, setItemQuantity] = useState<number>(canAdditem ? 1 : 0);

  const handleModifierChange = (id: string, value: number) => {
    setModifierInputs(
      modifierInputs.map((m) => ({
        ...m,
        quantity: id === m.id ? value : m.quantity,
      })),
    );
  };

  const handleItemQuantityChange = (value: number) => setItemQuantity(value);
  const calculateTotalPrice = () => {
    return (
      itemQuantity * item.price +
      modifierInputs.reduce((accumulator, modifier) => {
        return accumulator + modifier.quantity * modifier.priceOverride;
      }, 0)
    );
  };

  return (
    <Modal onClose={onClose}>
      {/* <Modal.Header onClose={onClose}>
        <div className="flex flex-col gap-0">
          <p>{item.label}</p>
        </div>
      </Modal.Header> */}
      <Modal.Content>
        <div className="grid grid-cols-3">
          <img
            className="object-cover h-full"
            src={`../../${item.label.replace(/\s+/g, "-").toLowerCase()}.jpeg`}
            alt={item.label}
          />

          <div className="flex flex-col col-start-2 col-span-2">
            <div className="flex flex-col gap-2 p-4">
              <button
                type="button"
                className="ml-auto font-semibold outline-none ring-0 border-0 rounded-full py-0 px-2 hover:outline-none hover:ring-0 hover:border-0 focus:outline-none focus:ring-0 focus:border-0"
                onClick={onClose}
              >
                X
              </button>
              <p className="text-2xl font-semibold">
                {item.label} (
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.price)}
                )
              </p>
              <p className="font-normal">{item.description}</p>

              {modifierInputs.length > 0 && (
                <div className="flex flex-col gap-2 bg-amber-100 rounded-md p-2">
                  <p className="font-bold">Select options:</p>
                  {modifierInputs.map((modifier) => {
                    return (
                      <div
                        key={`item-modifier-${modifier.id}`}
                        className="grid grid-cols-3 gap-2 justify-between rounded-md items-center bg-white p-2 hover:bg-amber-50"
                      >
                        <p className="font-semibold">{modifier.label}</p>
                        <p className="text-center">
                          +
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(modifier.priceOverride)}
                        </p>
                        <div className="flex flex-col gap-1 ml-auto">
                          <input
                            type="number"
                            className={clsx(
                              "border border-gray-400 rounded-md px-1 py-0.5 focus-within:ring-4 focus-visible:outline-none transition duration-100 min-w-16 w-min ml-auto",
                              { "cursor-not-allowed": !canAdditem },
                            )}
                            min={0}
                            max={modifier.selectionRequiredMax}
                            value={modifier.quantity}
                            onChange={(e) =>
                              handleModifierChange(modifier.id, +e.target.value)
                            }
                            disabled={!canAdditem}
                          />
                          <p className="text-gray-500 text-xs">
                            Max of {modifier.selectionRequiredMax}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-row justify-between items-center bg-gray-100 p-4">
              <div className="flex flex-row flex-wrap items-center gap-1">
                <input
                  type="number"
                  className={clsx(
                    "text-lg border border-gray-400 rounded-md px-1 py-0.5 focus-within:ring-4 focus-visible:outline-none transition duration-100 min-w-16",
                    { "cursor-not-allowed": !canAdditem },
                  )}
                  min={0}
                  max={item.quantity}
                  value={itemQuantity}
                  onChange={(e) => handleItemQuantityChange(+e.target.value)}
                  disabled={!canAdditem}
                />
                <p className="text-gray-500 text-sm">
                  In stock: {item.quantity}
                </p>
              </div>

              <button
                type="button"
                className={clsx(
                  "outline-none ring-0 border-none hover:border-none focus:outline-none bg-orange-500 text-white text-sm font-bold",
                  {
                    "cursor-not-allowed opacity-50":
                      !isMenuAvailable || item.isSoldOut,
                  },
                )}
                disabled={!isMenuAvailable}
                onClick={onClose}
              >
                {isMenuAvailable
                  ? item.isSoldOut
                    ? "Sold out"
                    : `Add ($${new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(calculateTotalPrice())})`
                  : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </Modal.Content>
      {/* <Modal.Footer>
        <button
          type="button"
          className="outline-none ring-0 border border-gray-500 rounded-md py-1 px-2 hover:bg-gray-100 hover:border-gray-500 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0"
          onClick={onClose}
        >
          Close
        </button>

        <button
          type="button"
          className="outline-none ring-0 border border-orange-500 bg-orange-500 text-white font-semibold rounded-md py-1 px-2 hover:bg-orange-500 hover:border-orange-500 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0"
          onClick={onClose}
        >
          Add
        </button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ItemModal;
