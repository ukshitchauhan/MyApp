import React from 'react';
import { useEffect } from 'react';
import { allPost } from '../services/API';
import { useState } from 'react';

const PostCard = React.memo(({posts}) => {
  return (
  <>

  {[...posts].reverse().map((post)=>{
    return <div key={post._id} className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar (Generated from username) */}
          <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0">
             <img 
               src={post.user.image}
               alt="avatar" 
               className="w-full h-full object-cover opacity-80" 
             />
          </div>
          
          {/* User & Date */}
          <div>
            <h4 className="font-semibold text-white text-sm">{post.user.username}</h4>
            <p className="text-xs text-zinc-500">{
            new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      <div className="flex gap-6 text-zinc-500 text-sm pt-4 border-t border-zinc-800/50">
        <button className="flex items-center gap-2 hover:text-violet-400 transition-colors group/like">
          <svg className="w-4 h-4 group-hover/like:fill-violet-400/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <span>{}</span>
        </button>
        
        {/* Kept generic comment button (no count required) */}
        <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        </button>
      </div>  
    </div>
  })}
  </>
  );
});

export default PostCard;