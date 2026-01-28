import React, { useState } from "react";

const EditPost = ({ user, post, onClose, onSave }) => {
  const [content, setContent] = useState(post.content);
  const [id, setId] = useState(post._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave({ id, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-violet-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>

      {/* --- EDIT CARD --- */}
      {/* Changed width to w-[90%] for mobile responsiveness */}
      <div className="relative w-[90%] max-w-lg bg-zinc-900/90 backdrop-blur-md border border-zinc-800/50 rounded-xl p-6 md:p-8 shadow-2xl shadow-purple-900/20 z-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">Edit Post</h1>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-zinc-950/50 rounded-lg border border-zinc-800/50">
          <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0 overflow-hidden">
            <img
              src={user?.image}
              alt="avatar"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="text-sm overflow-hidden">
            <p className="text-zinc-300 truncate">
              <span className="text-zinc-500">Posting as:</span> @{user?.username}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-violet-400 mb-2">
              Post Content
            </label>
            <textarea
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none leading-relaxed"
            />
            <p className="text-right text-xs text-zinc-500 mt-2">
              {content.length} characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-violet-900/30 text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;