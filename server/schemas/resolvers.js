const { User, Thought } = require('../models')


const resolvers = {
    Query: {
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1})
        },
        thought: async(parent, { _id }) => {
            return Thought.findOne({_id});
        },
        users: async() => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts')
            // .populate('reactions')
        },
        user: async(parent, {username}) => {
            return User.findOne({username})
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts')
            // .populate('reactions')
        }
    }
};

module.exports = resolvers;