import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import PostCard from './PostCard';
import Account from './Account';
import { allPost, dashboard, newPost } from '../services/API';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('home');
  const [loggedinUserID, setLoggedinUserID] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    dashboard()
      .then((res) => setLoggedinUserID(res.data.user.id))
      .catch(() => navigate('/'));

    allPost()
      .then((res) => setPosts(res.data.posts))
      .catch((err) => alert(err.response?.data?.message));
  }, [navigate]);

  const handlePost = async (e) => {
    try {
      const response = await newPost({ loggedinUserID, postContent });
      setPostContent('');
      alert(response.data.message);

      const res = await allPost();
      setPosts(res.data.posts);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logout');
    navigate('/login');
  };

  // --- ICONS ---
  const HomeIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
  const UserIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>;
  const LogOutIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans selection:bg-violet-500/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-700 blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-700 blur-[128px] opacity-20"></div>
      </div>

      <div className="relative z-10 flex max-w-5xl lg:max-w-6xl mx-auto min-h-screen">
        
        {/* Desktop Sidebar (Hidden on Mobile) */}
        <div className="hidden md:block w-64 shrink-0 border-r border-zinc-800/50 sticky top-0 h-screen">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        {/* pb-24 adds padding at bottom so content isn't hidden behind mobile nav */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 w-full"> 
          
          <header className="mb-6 md:mb-8 flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-tight">
              {currentView === 'home' ? 'Home Feed' : 'My Account'}
            </h2>
            
            {/* Mobile Logo (Fixed Gradient) */}
            <div className="md:hidden relative w-9 h-9 bg-linear-to-tr from-violet-600 to-purple-500 rounded-xl shadow-lg shadow-violet-500/20 flex items-center justify-center overflow-hidden shrink-0 group">
                <div className="w-4 h-4 bg-white/90 rotate-45 rounded-sm group-hover:rotate-90 transition-transform duration-300"></div>
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
            </div>
          </header>

          {currentView === 'home' ? (
            <>
              {/* Post Input */}
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 mb-6 shadow-lg shadow-black/20">
                <input
                  type="text"
                  placeholder="What is happening?"
                  className="w-full bg-transparent text-white placeholder-zinc-500 outline-none mb-4 text-lg"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
                <div className="flex justify-end border-t border-zinc-800/50 pt-3">
                  <button
                    onClick={handlePost}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-all active:scale-95"
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Feed */}
              <div className="space-y-4">
                <PostCard posts={posts} />
              </div>
            </>
          ) : (
            <Account
              id={loggedinUserID}
              setPosts={setPosts}
            />
          )}
        </main>
      </div>

      {/* --- MOBILE BOTTOM NAVIGATION (LOCKED) --- */}
      {/* fixed bottom-0: Locks to bottom */}
      {/* z-50: Ensures it stays on top of content */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 z-50 pb-safe safe-area-bottom">
        <div className="flex justify-around items-center p-3 h-16">
          
          <button 
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'home' ? 'text-violet-400' : 'text-zinc-500'}`}
          >
            <HomeIcon />
            <span className="text-[10px] font-medium tracking-wide">Home</span>
          </button>
          
          <button 
            onClick={() => setCurrentView('account')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${currentView === 'account' ? 'text-violet-400' : 'text-zinc-500'}`}
          >
            <UserIcon />
            <span className="text-[10px] font-medium tracking-wide">Account</span>
          </button>

          <button 
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
          >
            <LogOutIcon />
            <span className="text-[10px] font-medium tracking-wide">Logout</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;