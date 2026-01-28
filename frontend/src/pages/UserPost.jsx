import React from 'react';

const UserPost = ({ user, posts, onEdit, onDelete }) => {
  return (
    <>
      {posts.reverse().map((post) => (
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
      
      {/* Header: User Info & Actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar (Generated from username) */}
          <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden shrink-0">
             <img 
               src={user.image} 
               alt="avatar" 
               className="w-full h-full object-cover opacity-80" 
             />
          </div>
          
          {/* User & Date */}
          <div>
            <h4 className="font-semibold text-white text-sm">{user.username}</h4>
            <p className="text-xs text-zinc-500">{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}</p>
          </div>
        </div>
        
        {/* Edit/Delete Controls (Visible only to Owner) */}
        {(
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => onEdit(post)}
              className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" 
              title="Edit Post"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
            <button 
              onClick={() => onDelete(post._id)}
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
        <div className="flex gap-6 text-zinc-500 text-sm pt-4 border-t border-zinc-800/50">
        <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">
          {post.content}
        </p>
      </div>
      </div> 
    </div>
      ))}
    </>
  );
};

export default UserPost;
