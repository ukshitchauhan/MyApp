import React, { useState, useEffect } from 'react';
import { allPost, deletePost, findUser, updatePost, updateUser } from '../services/API';
import UserPost from './UserPost';
import EditPost from './EditPost';

const Account = ({ id, setPosts }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    findUser(id)
      .then((res) => {
        const userData = res.data.user;
        setUser(userData);
        setUserName(userData.username);
        setProfilePic(userData.image);
        setMyPosts(userData.posts || []);
      })
      .catch(console.log);
  }, [id]);

  const updateHandler = async () => {
    try {
      const response = await updateUser({ id, userName, profilePic });
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        setMyPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        const res = await allPost();
        setPosts(res.data.posts);
        alert('Post Deleted');
      } catch (err) {
        alert('Something Went Wrong');
      }
    }
  };

  const handleEditPost = async (content) => {
    setEditingPost(content);
  };

  const updatePostHandler = async (content) => {
    try {
      const response = await updatePost(content);
      const updatedPostFromServer = response.data.updatePost;

      setMyPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPostFromServer._id ? updatedPostFromServer : post
        )
      );

      const res = await allPost();
      setPosts(res.data.posts);

      setEditingPost(null);
      alert("Post updated");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* 1. MANAGE PROFILE SECTION */}
      <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Responsive Layout: Stack on Mobile, Row on Desktop */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group shrink-0">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-zinc-800 shadow-xl"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-zinc-400 mb-2">Profile Image URL</label>
              <input
                type="text"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
                disabled={!isEditing}
                className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:border-violet-500 focus:outline-none disabled:opacity-50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white focus:border-violet-500 focus:outline-none disabled:opacity-50 transition-all"
            />
          </div>

          <div className="flex gap-4 pt-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3 w-full md:w-auto">
                <button
                  type="submit"
                  className="flex-1 md:flex-none px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
                  onClick={() => updateHandler()}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 md:flex-none px-6 py-2 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* 2. MANAGE POSTS SECTION */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 pl-1">My Posts</h3>
        <div className="space-y-4">
          {myPosts && myPosts.length > 0 ? (
            <UserPost
              user={user}
              posts={myPosts}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          ) : (
            <div className="text-center py-10 text-zinc-500 bg-zinc-900/30 rounded-xl border border-dashed border-zinc-800">
              No posts found.
            </div>
          )}
        </div>
      </div>
      
      {editingPost && (
        <EditPost
          user={user}
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSave={(content) => updatePostHandler(content)}
        />
      )}
    </div>
  );
};

export default Account;