import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen flex flex-col relative bg-[#fffefa]">
      {children}
    </div>
  );
};

export default Layout;
