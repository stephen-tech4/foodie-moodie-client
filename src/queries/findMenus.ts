import { gql } from "@apollo/client";

/**
 * GraphQL query to fetch menus
 */
export const FIND_MENUS = gql`
  query FindMenus {
    menus {
      id
      label
      startDate
      endDate
      state

      sections {
        id
        label
        description
        displayOrder

        items {
          id
          type
          label
          description
          price
          quantity
          isSoldOut

          modifiers {
            id
            label
            defaultQuantity
            priceOverride

            modifierGroup {
              id
              label
              selectionRequiredMin
              selectionRequiredMax
            }
          }
        }
      }
    }
  }
`;
