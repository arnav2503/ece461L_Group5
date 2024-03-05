import NavigationBar from "@/components/NavigationBar";
import React from "react";

interface PageHeaderProps {
  before?: React.ReactNode;
  after?: React.ReactNode;
  em?: React.ReactNode;
}

function PageHeader(props: PageHeaderProps) {
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
