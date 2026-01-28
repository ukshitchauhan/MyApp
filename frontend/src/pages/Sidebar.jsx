import React from 'react';
import { useNavigate } from 'react-router-dom';


// Icons (Internal to keep it self-contained)
const HomeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const UserIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
const LogOutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;

const Sidebar = ({ currentView, onViewChange }) => {
  const navigate = useNavigate()

  const logout=()=>{
    localStorage.removeItem('token')
    alert('Logout')
    navigate('/login')
  }

  const NavItem = ({ icon, label, viewName }) => (
    <button 
      onClick={() => onViewChange(viewName)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        currentView === viewName 
          ? 'bg-violet-600/10 text-violet-400 border border-violet-600/20' 
          : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <aside className="hidden md:flex flex-col w-64 p-6 border-r border-zinc-800/50 sticky top-0 h-screen">
      <div className="mb-10 flex items-center gap-2">
        <div className="w-8 h-8 bg-linear-to-tr from-violet-600 to-purple-500 rounded-lg"></div>
        <h1 className="text-2xl font-bold tracking-tight text-white">MyApp</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<HomeIcon />} label="Home" viewName="home" />
        <NavItem icon={<UserIcon />} label="Account" viewName="account" />
      </nav>

      <button
      onClick={()=>{
        logout()
      }}
      className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900/50 rounded-xl transition-all mt-auto">
        <LogOutIcon />
        <span>Log out</span>
      </button>
    </aside>
  );
};

export default Sidebar;