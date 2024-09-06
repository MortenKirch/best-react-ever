
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import User from "../components/User"
export default function UpdatePage(){

    
const {id} = useParams();
const [user, setUser] = useState({});
const navigate = useNavigate();

function showDeleteDialog(){
    const shouldDelete = window.confirm(`do you want to delete "${user.name}"`)
    if(shouldDelete){
        deleteUser()
    }
}
function deleteUser(){
    const data = localStorage.getItem("users")
    const usersData = JSON.parse(data) || [];
    const updatedUsers = usersData.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    navigate("/")
}
function showUpdate(){
    navigate(`/users/${id}/update`)
}

useEffect(()=>{

const data = localStorage.getItem("users")
const usersData = JSON.parse(data) || [];
const user = usersData.find(user => user.id === id);
console.log(user)
setUser(user)

}, [id]);

return(
    <div id="user-page">
        <div className="container">
            <h1>{user.name}</h1>
            <p>User Id: {id}</p>
            <User user={user}/>
            <div className="btns">
               <button type="button" className="btn-cancel" onClick={showDeleteDialog}>
                Delete user</button>
               <button type="button" onClick={showUpdate}>
                 Update user</button>
               </div>
        </div>
    </div>
)



}