
 import React from 'react'; 
 import { Link, useLocation } from 'react-router-dom'; 
 import { School, LogOut } from 'lucide-react'; 
 import { useUserStore } from '../lib/store'; 
  
 const channels = [ 
   'Announcements', 'KG1', 'KG2',  
   'Junior 1', 'Junior 2', 'Junior 3', 'Junior 4', 'Junior 5', 'Junior 6', 
   'Middle 1', 'Middle 2', 'Middle 3', 
   'Senior 1', 'Senior 2', 'Senior 3' 
 ]; 
  
 export function Layout({ children }: { children: React.ReactNode }) { 
   const location = useLocation(); 
   const { username, logout } = useUserStore(); 
  
   return ( 
     <div className="min-h-screen bg-gray-50"> 
       <header className="bg-blue-600 text-white shadow-lg"> 
         <div className="container mx-auto px-4 py-3 flex items-center justify-between"> 
           <Link to="/" className="flex items-center space-x-2 text-xl font-bold"> 
             <School /> 
             <span>SES.Platform</span> 
           </Link> 
           <div className="flex items-center space-x-4"> 
             {username ? ( 
               <> 
                 <span>Welcome, {username}</span> 
                 <button 
                   onClick={logout} 
                   className="p-2 hover:bg-blue-700 rounded-full" 
                 > 
                   <LogOut size={20} /> 
                 </button> 
               </> 
             ) : ( 
               <Link to="/login" className="hover:underline"> 
                 Login 
               </Link> 
             )} 
           </div> 
         </div> 
       </header> 
  
       <div className="container mx-auto px-4 py-8 flex gap-6"> 
         <aside className="w-64 flex-shrink-0"> 
           <nav className="space-y-1"> 
             {channels.map((channel) => ( 
               <Link 
                 key={channel} 
                 to={`/${channel.toLowerCase().replace(/\s+/g, '-')}`} 
                 className={`block px-4 py-2 rounded-lg ${ 
                   location.pathname === `/${channel.toLowerCase().replace(/\s+/g, '-')}` 
                     ? 'bg-blue-600 text-white' 
                     : 'hover:bg-gray-100' 
                 }`} 
               > 
                 {channel} 
               </Link> 
             ))} 
           </nav> 
         </aside> 
  
         <main className="flex-1 min-w-0"> 
           {children} 
         </main> 
       </div> 
     </div> 
   ); 
 } 
 
