import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Redirect, useParams } from 'react-router';

import ThoughtList from '../components/ThoughtList';
import FriendsList from '../components/FriendsList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { ADD_FRIEND } from '../utils/mutations'
import auth from '../utils/auth';

const Profile = () => {

  const [addFriend] = useMutation(ADD_FRIEND)

  const handleClick = async () => {
    try {
      await addFriend({
        variables: {id: user._id}
      })
    }
    catch (e){
      console.error(e)
      alert(e.message)
    }
  }


  const {username: userParam} = useParams();
  const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, { variables: { username: userParam}})
  const user = data?.me || data?.user || {};

  if(auth.loggedIn() && auth.getProfile().data.username === userParam){
    return <Redirect to='/profile'/>
  }
  if(!user?.username){
    return (
      <h4>
        You need to be logged in to see this page. Click 'Log In' or 'Sign Up' to gain access! 
      </h4>
    )
  }

  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {userParam ? `${user.username}'s` : 'My'} profile
        </h2>
        {userParam && (
        <button className='btn ml-auto' onClick={handleClick}>Add Friend</button>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8"><ThoughtList thoughts={user.thoughts} title={`${user.username}'s thoughts..`}/></div>

        <div className="col-12 col-lg-3 mb-3"><FriendsList username={user.username} friendCount={user.friendCount} friends={user.friends}/>
        </div>
      </div>
      <div className='mb-3'>{!userParam && <ThoughtForm/>}</div>
    </div>
  );
};

export default Profile;
