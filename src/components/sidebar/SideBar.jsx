// import { useEffect, useState } from "react";
// import axios from "axios";
import "./SideBar.css";

export default function SideBar () {
    return (
        <aside className="SideBar">
            
        </aside>
    );
 }


 //     const [groups, setGroups] = useState([]);

//     useEffect(() => {
//         fetchGroups();
//     }, []);

//     async function FetchGroups() {
//     try {
//         const response = await axios.get("/")
//         setGroups(response.data);
//     } catch (error) {
//         console.error(error);
//      }
//     }
//     return (
//     <aside className="SideBar">
//       {groups.map((group) => (
//         <div className="groupCard" key={group.id}>
//           <img
//             src={group.image}
//             alt={group.name}
//             className="groupImage"
//           />

//           <span>{group.name}</span>
//         </div>
//       ))}
//     </aside>
//     );