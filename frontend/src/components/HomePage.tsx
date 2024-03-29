import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/projects");
  };
  const handleGitHub = () => {
    window.open("https://github.com/arnav2503/ece461L_Group5");
  };
  return (
    <div className="space-y-3 flex flex-col border rounded-2xl p-5 py-20 h-[92dvh]">
      <div className="flex space-y-10 flex-col m-10 items-center">
        <h1 className="text-4xl font-bold text-center">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-purple-600 to-red-500">
            Group 5:
          </span>{" "}
          Project Management App
        </h1>
        <h2 className="text-2xl text-center">
          ECE 461L: Software Engineering & Design Lab <br />
          Spring 2024, The University of Texas at Austin
        </h2>
        <p className="text-center text-lg">
          A project management app for managing projects and allocating
          resources. <br />
          Capstone project for ECE 461L. <br />
          Built by Armaan Vakharia, Arnav Kithania, Fahim Imtaiz, and Wasay
          Asrar.
        </p>
        <div className="border rounded-2xl p-5 align-middle items-center justify-center">
          <h2 className="text-2xl text-center font-bold mb-5">Tech Stack</h2>
          <div className="flex flex-col">
            <div className="flex justify-between w-full space-x-5">
              <p className="text-left">Frontend: </p>
              <p className="text-right">
                <a href="https://react.dev">React</a>,{" "}
                <a href="https://www.typescriptlang.org/">TypeScript</a>,{" "}
                <a href="https://tailwindcss.com">TailwindCSS</a>
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-left">Backend: </p>
              <p className="text-right">
                <a href="https://www.python.org/">Python</a>,{" "}
                <a href="https://flask.palletsprojects.com/en/3.0.x/">Flask</a>
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-left">Database: </p>
              <a href="https://mongodb.com/" className="text-right">
                MongoDB Atlas
              </a>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-left">Web Host: </p>
              <a href="https://render.com/" className="text-right">
                Render
              </a>
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
