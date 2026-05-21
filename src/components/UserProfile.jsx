import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFeed } from "../utils/feedSlice";
import axios from "axios";

const UserProfile = ({ user }) => {
  const { _id, firstName, lastName, photoURL, age, gender, skills } = user;
  const dispatch = useDispatch();
  const defaultImage =`https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=terminal-${firstName}`;

  const handleSendRequest = async(status) =>{
    try{
      const res = await axios.post( 
        BASE_URL+ "/send/"+ status + "/" + user._id,
        {},
      {withCredentials: true},
    );
    
    dispatch(removeUserFeed(user._id));
    }

    catch(err){
      console.log(err.response?.data || err.message);
    }

  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl rounded-2xl overflow-hidden">

      <figure className="h-110 bg-gray-200 flex items-center justify-center">
        <img
          src={photoURL ? photoURL : defaultImage}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold">
          {firstName} {lastName}
        </h2>

        <p className="text-gray-500 text-sm">
          {age ? `${age} years old` : ""} {gender || ""}
        </p>

        <p className="flex flex-wrap gap-2 mt-4">
          Skills : {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span key={index}>
                {skill}
              </span>
            ))
          ) : null}
        </p>
      </div>
    </div>
  );
};
export default UserProfile;

