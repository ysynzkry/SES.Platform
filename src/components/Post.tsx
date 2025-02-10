
 import React from 'react'; 
 import { formatDistanceToNow } from 'date-fns'; 
 import { Heart, MessageSquare, PaperclipIcon } from 'lucide-react'; 
 import { useUserStore } from '../lib/store'; 
  
 export function Post({ post, onLike, onComment }) { 
   const { username } = useUserStore(); 
    
   return ( 
     <article className="bg-white rounded-xl shadow-sm p-6 mb-6"> 
       <div className="flex justify-between items-start mb-4"> 
         <div> 
           <h3 className="font-semibold text-lg">{post.username}</h3> 
           <time className="text-sm text-gray-500"> 
             {formatDistanceToNow(post.timestamp?.toDate() || new Date(), { addSuffix: true })} 
           </time> 
         </div> 
       </div> 
  
       <div className="prose max-w-none mb-4"> 
         {post.content} 
       </div> 
  
       {post.attachments?.length > 0 && ( 
         <div className="flex flex-wrap gap-2 mb-4"> 
           {post.attachments.map((attachment, i) => ( 
             <a 
               key={i} 
               href={attachment.url} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="flex items-center gap-1 text-sm text-blue-600 hover:underline" 
             > 
               <PaperclipIcon size={16} /> 
               {attachment.name} 
             </a> 
           ))} 
         </div> 
       )} 
  
       <div className="flex items-center gap-4 pt-4 border-t"> 
         <button 
           onClick={() => username && onLike(post.id)} 
           className={`flex items-center gap-1 ${ 
             post.likes?.includes(username) ? 'text-red-500' : 'text-gray-500' 
           }`} 
         > 
           <Heart size={20} /> 
           <span>{post.likes?.length || 0}</span> 
         </button> 
          
         <button 
           onClick={() => username && onComment(post.id)} 
           className="flex items-center gap-1 text-gray-500" 
         > 
           <MessageSquare size={20} /> 
           <span>{post.comments?.length || 0}</span> 
         </button> 
       </div> 
  
       {post.comments?.length > 0 && ( 
         <div className="mt-4 space-y-3"> 
           {post.comments.map((comment, i) => ( 
             <div key={i} className="bg-gray-50 rounded-lg p-3"> 
               <div className="flex justify-between items-start"> 
                 <span className="font-medium">{comment.username}</span> 
                 <time className="text-xs text-gray-500"> 
                   {formatDistanceToNow(comment.timestamp?.toDate() || new Date(), { addSuffix: true })} 
                 </time> 
               </div> 
               <p className="mt-1 text-gray-700">{comment.content}</p> 
             </div> 
           ))} 
         </div> 
       )} 
     </article> 
   ); 
 } 
 