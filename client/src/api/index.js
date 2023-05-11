import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   }
// };


API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const createPromotion = (newPromotion) => API.post('/promotions', newPromotion);
export const fetchPromotions = (page) => API.get(`/promotions?page=${page}`);
export const fetchPromotion = (id) => API.get(`/promotions/${id}`);

export const fetchgChannel = (codeRes) => API.post('/auth/google/yt', codeRes)
export const fetchgVideo = (codeRes, videoId) => API.post(`/auth/vid/${videoId}`, codeRes,)


export const createChannel = (newChannel) => API.post('/channels', newChannel);
export const fetchChannelsByUser = (user) => API.post('/channels', user);
export const updateChannel = (id, updatedChannel) => API.patch(`/channels/${id}`, updatedChannel);
export const deleteChannel = (id) => API.delete(`/channels/${id}`);
export const fetchChannels = (page) => API.get(`/channels?page=${page}`);
export const fetchChannel = (id) => API.get(`/channels/${id}`);


export const createVideo = (newVideo) => API.post('/videos', newVideo);
export const fetchVideosBySearch = (searchQuery) => API.get(`/videos/search?searchQuery=${searchQuery.search || 'none'}`);
export const fetchVideosByUser = (user) => API.post('/videos', user);
export const fetchVideosByCategory = (category) => API.get(`/videos/category?id=${category}`);
export const fetchVideosByChannel = (channel) => API.get(`/videos/channel?id=${channel}`);
export const updateVideo = (id, updatedVideo) => API.patch(`/videos/${id}`, updatedVideo);
export const deleteVideo = (id) => API.delete(`/videos/${id}`);
export const likeVideo = (id) => API.patch(`/videos/${id}/likeVideo`);
export const fetchVideos = (page) => API.get(`/videos?page=${page}`);
export const fetchVideo = (id) => API.get(`/videos/${id}`);


export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const gsignUp = (result) => API.post('/user/gsignup', result);
export const fetchUser = (user) => API.post('/user/fetchuser', user);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const createMessage = (newMessage) => API.post('/user/message', newMessage);
