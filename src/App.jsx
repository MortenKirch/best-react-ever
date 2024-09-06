
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage'
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import UserDetailPage from "./pages/UserDetailPage"
import UserUpdatePage from "./pages/UserUpdatePage"


function App() {
return(
 <main className="app">
  <Navbar></Navbar>
<Routes>
  <Route path="/" element={<HomePage/>}/>
  <Route path="/create" element={<CreatePage/>}/>
  <Route path="/users/:id" element={<UserDetailPage/>}/>
  <Route path="/users/:id/update" element={<UserUpdatePage/>}/>
</Routes>
 </main>
 );
}

export default App
