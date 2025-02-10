
 import { useState, useEffect } from 'react'; 
 import { collection, query, where, orderBy, addDoc, updateDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore'; 
 import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
 import { db, storage } from '../lib/firebase'; 
 import { useUserStore } from '../lib/store'; 
 import { Post } from '../components/Post'; 
 import { NewPostForm } from '../components/NewPostForm'; 
  
 export function ChannelPage({ channel }) { 
   const [posts, setPosts] = useState([]); 
   const [isLoading, setIsLoading] = useState(false); 
   const username = useUserStore((state) => state.username); 
  
   useEffect(() => { 
     const fetchPosts = async () => { 
       const q = query( 
         collection(db, 'posts'), 
         where('channel', '==', channel), 
         orderBy('timestamp', 'desc') 
       ); 
        
       const unsubscribe = onSnapshot(q, (snapshot) => { 
         const newPosts = snapshot.docs.map(doc => ({ 
           id: doc.id, 
           ...doc.data() 
         })); 
         setPosts(newPosts); 
       }); 
  
       return () => unsubscribe(); 
     }; 
  
     fetchPosts(); 
   }, [channel]); 
  
   const handleNewPost = async (data) => { 
     setIsLoading(true); 
     try { 
       const fileUrls = []; 
       if (data.files) { 
         for (const file of data.files) { 
           const storageRef = ref(storage, `files/${Date.now()}-${file.name}`); 
           await uploadBytes(storageRef, file); 
           const url = await getDownloadURL(storageRef); 
           fileUrls.push({ name: file.name, url }); 
         } 
       } 
  
       await addDoc(collection(db, 'posts'), { 
         content: data.content, 
         username, 
         channel, 
         timestamp: serverTimestamp(), 
         attachments: fileUrls, 
         likes: [], 
         comments: [] 
       }); 
     } catch (error) { 
       console.error('Error creating post:', error); 
       alert('Failed to create post'); 
     } finally { 
       setIsLoading(false); 
     } 
   }; 
  
   const handleLike = async (postId) => { 
     const postRef = doc(db, 'posts', postId); 
     const post = posts.find(p => p.id === postId); 
     const likes = post.likes || []; 
      
     if (likes.includes(username)) { 
       await updateDoc(postRef, { 
         likes: likes.filter(u => u !== username) 
       }); 
     } else { 
       await updateDoc(postRef, { 
         likes: [...likes, username] 
       }); 
     } 
   }; 
  
   const handleComment = async (postId, content) => { 
     const postRef = doc(db, 'posts', postId); 
     const post = posts.find(p => p.id === postId); 
     const comments = post.comments || []; 
  
     await updateDoc(postRef, { 
       comments: [ 
         ...comments, 
         { 
           content, 
           username, 
           timestamp: serverTimestamp() 
         } 
       ] 
     }); 
   }; 
  
   return ( 
     <div> 
       <h1 className="text-3xl font-bold mb-6"> 
         {channel.charAt(0).toUpperCase() + channel.slice(1).replace(/-/g, ' ')} 
       </h1> 
  
       {username && <NewPostForm onSubmit={handleNewPost} isLoading={isLoading} />} 
  
       <div className="space-y-6"> 
         {posts.map((post) => ( 
           <Post 
             key={post.id} 
             post={post} 
             onLike={handleLike} 
             onComment={handleComment} 
           /> 
         ))} 
       </div> 
     </div> 
   ); 
 } 
 