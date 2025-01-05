import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main>
      <Outlet /> {/* This renders child routes */}
    </main>
  );
}

export default AuthLayout;
