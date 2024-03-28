import { ModeToggle } from "@/components/navbar/ModeToggle";
import NavigationBar from "@/components/navbar/NavigationBar";
import { cn } from "@/lib/utils";

import React from "react";
import { useMediaQuery } from "react-responsive";

interface PageHeaderProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  em?: React.ReactNode;
  subtitle?: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  return (
    <>
      {isTabletOrMobile ? null : <NavigationBar />}
      <div
        className={cn(
          "flex flex-row align-baseline items-baseline",
          isTabletOrMobile ? "justify-between" : "justify-center"
        )}
      >
        {isTabletOrMobile ? (
          <div className="flex flex-row justify-start items-center space-x-2">
            <NavigationBar />
            <ModeToggle />
          </div>
        ) : null}
        <div className="flex flex-col justify-center items-center m-4">
          <p className=" text-3xl font-light">
            {props.before}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-purple-600 to-red-500">
              {props.em}
            </span>
            {props.after}
          </p>
          <p className="text-md font-light text-foreground/75">
            {props.subtitle}
          </p>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
