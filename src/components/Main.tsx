import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tw-merge";

interface MainProps {
  title: string;
  className?: string;
  children: ReactNode;
}

const Main = ({ title, className, children }: MainProps) => {
  const finalClassName = twMerge(
    clsx("flex-grow p-4 max-w-[1280px] mx-auto", className),
  );

  return (
    <main role="main" className={finalClassName}>
      <header>
        <title>{title} - Foodie Goodie</title>
        <meta name="description" content="Foodie Goodie Food Ordering System" />
      </header>

      {children}
    </main>
  );
};

export default Main;
