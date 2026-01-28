import React from 'react';

const PostCard = ({ 
  user,      // database: user (username)
  date,      // database: Date (formatted string like "2h ago")
  content,   // database: content
  likes,     // database: Like (count)
  isOwner,   // derived in parent component
  onDelete, 
  onEdit 
}) => {
  return (
    <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
      
      {/* Header: User Info & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar (Generated from username) */}
          <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0">
             <img 
               src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} 
               alt="avatar" 
               className="w-full h-full object-cover opacity-80" 
             />
          </div>
          
          {/* User & Date */}
          <div>
            <h4 className="font-semibold text-white text-sm">{user}</h4>
            <p className="text-xs text-zinc-500">{date}</p>
          </div>
        </div>
        
        {/* Edit/Delete Controls (Visible only to Owner) */}
        {isOwner && (
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={onEdit} 
              className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" 
              title="Edit Post"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button 
              onClick={onDelete} 
              className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors" 
              title="Delete Post"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        )}
      </div>

      {/* Post Content (Text Only) */}
      <div className="mb-4">
        <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {/* Footer: Likes & Interaction */}
      <div className="flex gap-6 text-zinc-500 text-sm pt-4 border-t border-zinc-800/50">
        <button className="flex items-center gap-2 hover:text-violet-400 transition-colors group/like">
          <svg className="w-4 h-4 group-hover/like:fill-violet-400/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          <span>{likes}</span>
        </button>
        
        {/* Kept generic comment button (no count required) */}
        <button className="flex items-center gap-2 hover:text-violet-400 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default PostCard;