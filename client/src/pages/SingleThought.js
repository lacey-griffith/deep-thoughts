import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT} from '../utils/queries'

import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  const {id: thoughtId} = useParams();

  //deconstructing loading and data variables from the useQuery hook
  //the second argument in useQuery is how we pass variables to queries
  // the id property in variables object will be the $id parameter in the GraphQL query
  const {loading, data} = useQuery(QUERY_THOUGHT, { variables: { id: thoughtId } })
  
  //data variable being using to populate the thought object
  const thought = data?.thought || {};


  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions}/>}
    </div>
  );
};

export default SingleThought;