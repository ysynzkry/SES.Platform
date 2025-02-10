
 import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
 import { Layout } from './components/Layout'; 
 import { ChannelPage } from './pages/ChannelPage'; 
 import { LoginPage } from './pages/LoginPage'; 
  
 const channels = [ 
   'announcements', 'kg1', 'kg2', 
   'junior-1', 'junior-2', 'junior-3', 'junior-4', 'junior-5', 'junior-6', 
   'middle-1', 'middle-2', 'middle-3', 
   'senior-1', 'senior-2', 'senior-3' 
 ]; 
  
 export default function App() { 
   return ( 
     <BrowserRouter> 
       <Layout> 
         <Routes> 
           <Route path="/" element={<Navigate to="/announcements" replace />} /> 
           <Route path="/login" element={<LoginPage />} /> 
           {channels.map((channel) => ( 
             <Route 
               key={channel} 
               path={`/${channel}`} 
               element={<ChannelPage channel={channel} />} 
             /> 
           ))} 
         </Routes> 
       </Layout> 
     </BrowserRouter> 
   ); 
 } 
 