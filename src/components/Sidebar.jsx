import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bell,
  LayoutDashboard,
  Swords,
  CircleFadingPlus,
  Trophy,
} from "lucide-react";

const Sidebar = () => {
  const [contestCount, setContestCount] = useState(0);

  useEffect(() => {
    // Retrieve contests from localStorage
    const contests = JSON.parse(localStorage.getItem('contests')) || [];
    setContestCount(contests.length);
  }, []);

  return (
    <div className="hidden border-r bg-muted/40 md:block offwhite">
      <div className="flex h-full max-h-screen flex-col gap-5">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <Trophy size={35} strokeWidth={2.5} absoluteStrokeWidth />
            <span>Fantasy Contest</span>
          </Link>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "bg-muted text-primary" : "text-muted-foreground"} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`
              }
            >
              <LayoutDashboard size={28} strokeWidth={2} absoluteStrokeWidth />
              Dashboard
            </NavLink>
            <NavLink
              to="/contests"
              className={({ isActive }) =>
                `${isActive ? "bg-muted text-primary" : "text-muted-foreground"} flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary`
              }
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
                `${isActive ? "bg-muted text-primary" : "text-muted-foreground"} flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary`
              }
            >
              <CircleFadingPlus size={28} strokeWidth={2} absoluteStrokeWidth />
              Add Contest
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
