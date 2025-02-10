
 import { useState } from 'react'; 
 import { useNavigate } from 'react-router-dom'; 
 import { useUserStore } from '../lib/store'; 
  
 export function LoginPage() { 
   const [username, setUsername] = useState(''); 
   const navigate = useNavigate(); 
   const setStoreUsername = useUserStore((state) => state.setUsername); 
  
   const handleSubmit = (e: React.FormEvent) => { 
     e.preventDefault(); 
     if (username.trim()) { 
       setStoreUsername(username.trim()); 
       navigate('/announcements'); 
     } 
   }; 
  
   return ( 
     <div className="max-w-md mx-auto"> 
       <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6"> 
         <h2 className="text-2xl font-bold mb-4">Login</h2> 
         <div className="space-y-4"> 
           <div> 
             <label className="block text-sm font-medium mb-1">Username</label> 
             <input 
               type="text" 
               value={username} 
               onChange={(e) => setUsername(e.target.value)} 
               className="w-full rounded-lg border p-3 focus:ring-2 focus:ring-blue-500" 
               placeholder="Enter your username" 
               required 
             /> 
           </div> 
           <button 
             type="submit" 
             className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700" 
           > 
             Continue 
           </button> 
         </div> 
       </form> 
     </div> 
   ); 
 } 
 