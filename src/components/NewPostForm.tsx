
 import React from 'react'; 
 import { useForm } from 'react-hook-form'; 
 import { zodResolver } from '@hookform/resolvers/zod'; 
 import { z } from 'zod'; 
 import { Loader2 } from 'lucide-react'; 
  
 const schema = z.object({ 
   content: z.string().min(1, 'Content is required'), 
   password: z.string().min(1, 'Password is required'), 
   files: z.any(), 
 }); 
  
 // The admin password is defined here 
 const ADMIN_PASSWORD = 'YourNewPasswordHere'; // Change this to your desired password 
  
 export function NewPostForm({ onSubmit, isLoading }) { 
   const { 
     register, 
     handleSubmit, 
     formState: { errors }, 
     reset, 
   } = useForm({ 
     resolver: zodResolver(schema), 
   }); 
  
   const onFormSubmit = async (data) => { 
     if (data.password !== SmouhA9273$$&$$) { 
       alert('Invalid password'); 
       return; 
     } 
     await onSubmit(data); 
     reset(); 
   }; 
  
   return ( 
     <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-xl shadow-sm p-6 mb-6"> 
       <div className="space-y-4"> 
         <div> 
           <textarea 
             {...register('content')} 
             className="w-full rounded-lg border p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500" 
             placeholder="What's on your mind?" 
           /> 
           {errors.content && ( 
             <p className="text-red-500 text-sm mt-1">{errors.content.message}</p> 
           )} 
         </div> 
  
         <div> 
           <input 
             type="password" 
             {...register('password')} 
             className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500" 
             placeholder="Admin password" 
           /> 
           {errors.password && ( 
             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p> 
           )} 
         </div> 
  
         <div> 
           <input 
             type="file" 
             {...register('files')} 
             multiple 
             className="w-full" 
           /> 
         </div> 
  
         <button 
           type="submit" 
           disabled={isLoading} 
           className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 disabled:opacity-50" 
         > 
           {isLoading ? ( 
             <span className="flex items-center justify-center"> 
               <Loader2 className="animate-spin mr-2" /> 
               Posting... 
             </span> 
           ) : ( 
             'Post' 
           )} 
         </button> 
       </div> 
     </form> 
   ); 
 } 
 