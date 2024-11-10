import { cn } from "@nextui-org/react";
import { ReactNode } from "react";

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className = "" }: IconWrapperProps) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7",
    )}
  >
    {children}
  </div>
);
