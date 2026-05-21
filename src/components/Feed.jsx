import { useEffect } from "react";
import UserCard from "./UserCard"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    }
    catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

if (feed.length === 0) {
  return (
    <h1 className="text-center my-10 text-2xl">
      No new users to show. Please check back later!!
    </h1>
  );
}

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
}

export default Feed;