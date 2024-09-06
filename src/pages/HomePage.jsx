import { useEffect, useState } from "react";
import User from "../components/User";
import '../index.css';

export default function HomePage() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("")
    const [sortBy, setSortBy] = useState("name")
    
    console.log(users);
    
    useEffect(() => {
        getUsers();
        
        async function getUsers() {
            const data = localStorage.getItem("users");
            let usersData = [];
            
            if (data) {
                usersData = JSON.parse(data);
            } else {
                usersData = await fetchUsers();
               
            }

            
            setUsers(usersData);
     
        };

    }, []);

    async function fetchUsers() {
        const response = await fetch(
            "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
        );
        const data = await response.json();
        localStorage.setItem("users", JSON.stringify(data)); 
        return data;
      
    }

    let filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const titles = [...new Set(users.map(user => user.title))];
    console.log(titles)

    if(filter !=""){
        filteredUsers = filteredUsers.filter(user => user.title === filter);
    }

    filteredUsers.sort((user1, user2 )=> user1[sortBy].localeCompare(user2[sortBy]));
    return (
        <>
            <main className="page">
                <form className="grid-filter" role="search">
                    <label>
                    Search by Name <input placeholder="Search" type="search" onChange={e => setSearchTerm(e.target.value)}/>
                    </label>
                    <label >
                        Search by title <select onChange={e => setFilter(e.target.value)} >
                        <option value=""> Select title
                        </option>
                        {titles.map(title => (
                            <option key={title} value={title}>{title}
                            </option>
                        ))}

                    </select>
                    </label>
                    <label>
                        sort by
                        <select name="sort-by" onChange={e => setSortBy(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="title">Title</option>
                            <option value="mail">Mail</option>
                        </select>
                    </label>
                </form>

                <section className="grid">
                    {filteredUsers.map(user => (
                        <User key={user.id} user={user} />
                    ))}
                </section>
            </main>
        </>
    );
}
