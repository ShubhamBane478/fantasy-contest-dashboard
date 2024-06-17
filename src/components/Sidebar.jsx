import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Swords,
  CircleFadingPlus,
  Trophy,
  Menu,
  X
} from "lucide-react";

const Sidebar = () => {
  const [contestCount, setContestCount] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const contests = JSON.parse(localStorage.getItem('contests')) || [];
    setContestCount(contests.length);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <>
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center p-2 bg-background fixed top-0 left-0 right-0 z-50">
        <Link className="flex items-center gap-2 font-semibold" to="/">
          <Trophy size={28} strokeWidth={2.5} absoluteStrokeWidth />
          <span>Fantasy Contest</span>
        </Link>
        <button
          className="p-2 bg-background rounded-md"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-muted/40 border-r transition-transform duration-300 ease-in-out transform z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block offwhite`}
      >
        <div className="flex h-full max-h-screen flex-col">
          <div className="hidden md:flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link className="flex items-center gap-2 font-semibold" to="/">
              <Trophy size={35} strokeWidth={2.5} absoluteStrokeWidth />
              <span>Fantasy Contest</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-14 md:pt-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "bg-muted text-primary" : "text-muted-foreground"} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`
                }
                onClick={closeSidebar}
              >
                <LayoutDashboard size={28} strokeWidth={2} absoluteStrokeWidth />
                Dashboard
              </NavLink>
              <NavLink
                to="/contests"
                className={({ isActive }) =>
                  `${isActive ? "bg-muted text-primary" : "text-muted-foreground"} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary mt-2`
                }
                onClick={closeSidebar}
              >
                <Swords size={28} strokeWidth={2} absoluteStrokeWidth />
                Contest
                <div className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white">
                  {contestCount}
                </div>
              </NavLink>
              <NavLink
                to="/add-contest"
                className={({ isActive }) =>
                  `${isActive ? "bg-muted text-primary" : "text-muted-foreground"} flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary mt-2`
                }
                onClick={closeSidebar}
              >
                <CircleFadingPlus size={28} strokeWidth={2} absoluteStrokeWidth />
                Add Contest
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content padding for mobile */}
      <div className="md:hidden h-14"></div>
    </>
  );
};

export default Sidebar;