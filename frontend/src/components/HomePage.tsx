import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleGitHub = () => {
    window.open("https://github.com/arnav2503/ece461L_Group5");
  };
  return (
    <div className="space-y-3 flex flex-col">
      <div className="flex space-y-10 flex-col m-10 mt-20 items-center">
        <h1 className="text-4xl font-bold text-center">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-purple-600 to-red-500">
            Group 5:
          </span>{" "}
          Project Management App
        </h1>
        <h2 className="text-2xl text-center">
          ECE 461L: Software Engineering & Design Lab <br />
          Spring 2024, University of Texas at Austin
        </h2>
        <p className="text-center text-lg">
          A project management app for managing tasks and projects. <br />
          Capstone project for ECE 461L. <br />
          Built by Armaan Vakharia, Arnav Kithania, Fahim Imtaiz, and Wasay
          Asrar.
        </p>
        <div className="border rounded-2xl w-fit p-5">
          <h2 className="text-2xl text-center font-bold">Tech Stack</h2>
          <div className="flex flex-col space-x-5 justify-start items-center">
            <div className="text-lg justify-start">
              <span>Frontend:</span> TypeScript, React, Tailwind CSS
            </div>
            <div className="text-lg justify-start">
              <span>Backend:</span> Python, Flask
            </div>
            <div className="text-lg justify-between">
              <span>Database:</span> MongoDB Atlas
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-3 items-center">
        <Button className="group max-w-fit" onClick={handleClick}>
          Get Started{" "}
          <ArrowRight className="size-3 ml-3 group-hover:-rotate-45 transition-all" />
        </Button>
        <Button className="group" variant="outline" onClick={handleGitHub}>
          <GitHubLogoIcon className="size-3 mr-2" />
          Find the source code on GitHub
          <ArrowRight className="size-3 ml-3 group-hover:-rotate-45 transition-all" />
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
