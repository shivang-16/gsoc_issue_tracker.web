import React from "react";
import Gsoc_Orgs from "./_components/Gsoc_Orgs";
import { Navbar } from "@/components/shared/Navbar";
import { SidebarDemo } from "./_components/SIdebar";
import { Dashboard } from "./_components/Dashboard";

export default function Home() {
  return (
    <>
    {/* <SidebarDemo/> */}
    <Dashboard/>
    </>
  );
}
