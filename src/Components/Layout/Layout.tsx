import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">a</header>
      <Outlet />
    </div>
  );
};

export default Root;
