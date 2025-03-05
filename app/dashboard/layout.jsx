"use client";

import SidePanel from "./components/side-panel";
import UserNav from "./components/user-nav";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Side panel */}
      {/* className="w-64 overflow-y-auto border-r bg-white shadow-lg" */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64`}
      >
        <SidePanel />
      </aside>
      <div className="bg-pink-100 flex flex-1 flex-col overflow-hidden">
        {/* Dashboard header */}
        <header className="flex bg-white h-16 items-center justify-between gap-4 border-b px-6 shadow-sm">
          <button
            className="block md:hidden p-2 rounded-lg hover:bg-gray-200"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6 text-blue-500" />
          </button>
          <h1 className="text-2xl font-bold text-blue-700">MFlix Dashboard</h1>
          <UserNav className="end" />
        </header>
        {/* Dashboard page */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
