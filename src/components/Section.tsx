import clsx from "clsx";
import { ReactNode } from "react";
import { twMerge } from "tw-merge";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

const Section = ({ id, className, children }: SectionProps) => {
  return (
    <section id={id} className={twMerge(clsx("p-4", className))}>
      {children}
    </section>
  );
};

export default Section;
