import NavigationBar from "@/components/NavigationBar";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { ModeToggle } from "./ModeToggle";

interface PageHeaderProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  em?: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });
  if (isTabletOrMobile) {
    return (
      <>
        <div className="flex flex-row justify-between align-baseline items-baseline my-5">
          <div className="flex flex-row justify-start items-center space-x-2">
            <NavigationBar />
            <ModeToggle />
          </div>
          <div className=" text-3xl font-light">
            {props.before}
            <span className="font-bold dark:text-cyan-400 text-cyan-900">
              {props.em}
            </span>
            {props.after}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <NavigationBar />
      <div className="flex flex-row justify-center align-baseline items-baseline my-5">
        <p className=" text-3xl font-light">
          {props.before}
          <span className="font-bold dark:text-cyan-400 text-cyan-900">
            {props.em}
          </span>
          {props.after}
        </p>
      </div>
    </>
  );
}

export default PageHeader;
