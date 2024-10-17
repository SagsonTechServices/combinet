import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsByUserId } from '../../redux/features/blog/blogSlice';
import PostGrid from './PostGrid';
import CommunityContainer from './communityContainer';
import axios from 'axios';

function UserTabs({ user }) {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);
  const [communities, setCommunities] = useState([]); // Corrected useState syntax
  const [activeTab, setActiveTab] = useState(2);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Fetch blogs on initial render
  useEffect(() => {
    if (activeTab === 2) {
      dispatch(fetchBlogsByUserId(user._id));
    }
  }, [dispatch, user._id]);

  // Handle tab change and set appropriate content
  async function activateTab(tab_index) {
    setActiveTab(tab_index);
    if (tab_index === 2) {
      dispatch(fetchBlogsByUserId(user._id)); // Fetch blogs
    } else if (tab_index === 1) {
      try{
        const response = await axios.get(`${backendURL}/api/community/get-by-user/${user._id}`);
        console.log(response.data.communities)
        setCommunities(response.data.communities);
      }catch(error){
        console.log(error);
      } // Set created communities
    } else {
      setCommunities(user.joined_communities); // Set joined communities
    }
  }

  return (
    <div>
      <div role="tablist" className="tabs tabs-boxed">
        <a role="tab" className={`tab ${activeTab === 1 ? 'tab-active' : ''}`} onClick={() => activateTab(1)}>
          Created
        </a>
        <a role="tab" className={`tab ${activeTab === 2 ? 'tab-active' : ''}`} onClick={() => activateTab(2)}>
          Blogs
        </a>
        <a role="tab" className={`tab ${activeTab === 3 ? 'tab-active' : ''}`} onClick={() => activateTab(3)}>
          Joined
        </a>
      </div>

      <div className="mt-4">
        {loading && <div className="loading bg-primary loading-spinner block mx-auto loading-lg"></div>}
        {error && <p>Error: {error}</p>}

        {/* Render content based on the active tab */}
        {activeTab === 2 && blogs && <PostGrid blogs={blogs} />}
        {activeTab === 1 && (
          <div>
            <CommunityContainer communities={communities}></CommunityContainer>
          </div>
        )}
        {activeTab === 3 && (
          <div>
            <div>
                <CommunityContainer communities={communities}></CommunityContainer>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserTabs;
