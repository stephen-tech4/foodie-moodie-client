import { useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import { FIND_MENUS } from "../queries/findMenus";
import { Menu } from "../interfaces/Menu";
import Main from "../components/Main";
import { useEffect, useState } from "react";
import FoodMenu from "../components/FoodMenu";

const Home = () => {
  const { loading, data, error } = useQuery(FIND_MENUS);
  const [category, setCategory] = useState<string>("Pizza");
  const [menu, setMenu] = useState<Menu | undefined>(undefined);
  const menus: Menu[] = data?.menus || null;

  // Set the initial selected menu
  useEffect(() => {
    setMenu(menus?.find((m) => m.label === category));
  }, [menus, category]);

  if (error)
    return (
      <p className="text-red-500 p-4 rounded-lg bg-red-50 border border-red-500 m-4">
        Error: {error.message}
      </p>
    );

  return (
    <Layout>
      <Main title={loading ? "Loading Menu..." : `${category} Menu`}>
        {loading ? (
          "Loading..."
        ) : !error ? (
          menus.length > 0 ? (
            <FoodMenu
              menu={menu}
              category={category}
              setCategory={setCategory}
            />
          ) : (
            <p className="text-red-500">Inventory is empty at the moment!</p>
          )
        ) : (
          <p className="text-red-500">Error: {error}</p>
        )}
      </Main>
    </Layout>
  );
};

export default Home;
