// import React, { useEffect, useState } from "react";
// import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
// import { searchuser } from "../../../api/AdminApi/SearchUser/searchuser";
// // import SearchInput from '../SearchBAr';
// // import Pagination from '../Pagination';
// // import ModalDialog from '../ModalDialog';
// // import Table from '../Table';

// interface User{
//     _id:string,
//     name:string,
//     email:string,

//     isBlocked:boolean
// }

// const User:React.FC=()=>{
//     const[user,setuser]=useState<User[]>([])
//     const[searchterm,setsearchterm]=useState('')
//     const[sortOrder,setsortOrder]=useState<'asc'|'desc'>('asc')
//     const[loading,setloading]=useState<boolean>(false)
//     const[currentPage,setcurrentPage]=useState(1)
//     const [total, setTotal] = useState(0);
//     const limit=5


//     useEffect(()=>{
//         fetchuser()
//     },[sortOrder, currentPage])

//     const toggleSortOrder=()=>{
//       setsortOrder((prev)=>prev==='asc'?'desc':'asc')
//     }


//     const fetchuser=async()=>{
//         try {
//             const response=await axiosInstanceadmin.get(`/fetchuser?sortBy=name&order=${sortOrder}&page=${currentPage}`)
//             setuser(response.data.users)
//             setTotal(response.data.total)
//         } catch (error) {
//             console.error('Failed to fetch users', error);
            
//         }
//     }

//   const handleToggle = async (userId: string, isBlocked: boolean) => {
//   try {
//     const updatedStatus = !isBlocked;
//     await axiosInstanceadmin.patch(`/user/${userId}`, { isBlocked: updatedStatus });

//     // Update the specific user in local state
//     setuser((prevUsers) =>
//       prevUsers.map((u) =>
//         u._id === userId ? { ...u, isBlocked: updatedStatus } : u
//       )
//     );
//   } catch (error) {
//     console.error("Error toggling block status", error);
//   }
// };

// const handleSearch=async(e:React.ChangeEvent<HTMLInputElement>)=>{
//   setsearchterm(e.target.value)
// }

// useEffect(()=>{
//   const delaydebounce=setTimeout(async()=>{
//     try {
//       if(searchterm.trim()===""){
//         fetchuser()
//       }
//       else{
//         const response=await searchuser(searchterm)
//         setuser(response.data.user)
//       }
//     } catch (error) {
//         console.error('Search failed', error);
//     } finally {
//         setloading(false);
//     }
//   },500)
 
//     return () => clearTimeout(delaydebounce); // cleanup the timer
//   }, [searchterm]);



//     return(
//         <div className="flex-grow p-8">
//         <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
//           <h2 className="text-2xl font-bold mb-4 text-gray-700">User List</h2>
//           {loading ? (
//             <div className="text-center text-lg text-gray-500">Loading...</div>
//           ) : (
//             <>
//             <div className="search-options">
//                 <input
//                     type="text"
//                     value={searchterm}
//                     onChange={handleSearch}
//                     placeholder="Enter the search user"
//                     className="search-input"
//                 />
               
//             </div>

//             <table className="min-w-full table-auto text-left">
//               <thead>
//                 <tr className="text-gray-600 uppercase text-sm leading-normal">
//                  <th className="px-6 py-3 cursor-pointer" onClick={toggleSortOrder}>
//                     Name {sortOrder === 'asc' ? '↑' : '↓'}
//                   </th>
//                   <th className="px-6 py-3">Email</th>
                 
//                   <th className="px-6 py-3">Status</th>
//                   <th className="px-6 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm font-light">
//                 {user.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-6">
//                       No Users Found
//                     </td>
//                   </tr>
//                 ) : (
//                   user.map((use) => (
//                     <tr key={use._id} className="border-b border-gray-200 hover:bg-gray-100">
//                       <td className="px-6 py-4">{use.name}</td>
//                       <td className="px-6 py-4">{use.email}</td>
//                       <td className="px-6 py-4">{use.isBlocked ? "Blocked" : "Active"}</td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => handleToggle(use._id, use.isBlocked)}
//                           className={`px-4 py-2 rounded-md text-white ${
//                             use.isBlocked ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         >
//                           {use.isBlocked ? "Unblock" : "Block"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//             <div className="flex justify-center mt-4 gap-2">
//             <button
//               onClick={() => setcurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             <span className="px-3 py-1">{currentPage}</span>
//             <button
//               onClick={() => {
//                 const totalPages = Math.ceil(total / limit);
//                 setcurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
//               }}
//               disabled={currentPage >= Math.ceil(total / limit)}
//               className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>

//             </>

//           )}
          
//         </div>
        
//       </div>
      
    
//     )
// }

// export default User

import React, { useEffect, useState } from "react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import { searchuser } from "../../../api/AdminApi/SearchUser/searchuser";
import SearchInput from '../SearchBAr';

import Table from '../Table';

interface User{
    _id:string,
    name:string,
    email:string,

    isBlocked:boolean
}

const User:React.FC=()=>{
    const[user,setuser]=useState<User[]>([])
    const[searchterm,setsearchterm]=useState('')
    const[sortOrder,setsortOrder]=useState<'asc'|'desc'>('asc')
    const[loading,setloading]=useState<boolean>(false)
    const[currentPage,setcurrentPage]=useState(1)
    const [total, setTotal] = useState(0);
    const limit=5


    useEffect(()=>{
        fetchuser()
    },[sortOrder, currentPage])

    const toggleSortOrder=()=>{
      setsortOrder((prev)=>prev==='asc'?'desc':'asc')
    }


    const fetchuser=async()=>{
        try {
            const response=await axiosInstanceadmin.get(`/api/fetchuser?sortBy=name&order=${sortOrder}&page=${currentPage}`)
            setuser(response.data.users)
            setTotal(response.data.total)
        } catch (error) {
            console.error('Failed to fetch users', error);
            
        }
    }

  const handleToggle = async (userId: string, isBlocked: boolean) => {
  try {
    const updatedStatus = !isBlocked;
    await axiosInstanceadmin.patch(`/api/user/${userId}`, { isBlocked: updatedStatus });

    // Update the specific user in local state
    setuser((prevUsers) =>
      prevUsers.map((u) =>
        u._id === userId ? { ...u, isBlocked: updatedStatus } : u
      )
    );
  } catch (error) {
    console.error("Error toggling block status", error);
  }
};

const handleSearch=async(e:React.ChangeEvent<HTMLInputElement>)=>{
  setsearchterm(e.target.value)
}

useEffect(()=>{
  const delaydebounce=setTimeout(async()=>{
    try {
      if(searchterm.trim()===""){
        fetchuser()
      }
      else{
        const response=await searchuser(searchterm)
        setuser(response.data.user)
      }
    } catch (error) {
        console.error('Search failed', error);
    } finally {
        setloading(false);
    }
  },500)
 
    return () => clearTimeout(delaydebounce); // cleanup the timer
  }, [searchterm]);

   const columns = [
   { label: `Name ${sortOrder === 'asc' ? '↑' : '↓'}`, key: "name", onClick: toggleSortOrder, sortable: true },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Action", key: "action" },
  ];

    return(
        <div className="flex-grow p-8">
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">User List</h2>
          {loading ? (
            <div className="text-center text-lg text-gray-500">Loading...</div>
          ) : (
            <>
            <SearchInput
              value={searchterm}
              onChange={handleSearch}
              placeholder="Enter the name of user"
              className="border border-emerald-700 rounded-xl p-2 shadow-2xl ml-280 block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            />

           <Table
            columns={columns}
            data={user}
            renderRow={(use) => (
              <tr key={use._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4 cursor-pointer" onClick={toggleSortOrder}>{use.name}</td>
                <td className="px-6 py-4">{use.email}</td>
                <td className="px-6 py-4">{use.isBlocked ? "Blocked" : "Active"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggle(use._id, use.isBlocked)}
                    className={`px-4 py-2 rounded-md text-white ${
                      use.isBlocked ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {use.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            )}
          
          />
            <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setcurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">{currentPage}</span>
            <button
              onClick={() => {
                const totalPages = Math.ceil(total / limit);
                setcurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
              }}
              disabled={currentPage >= Math.ceil(total / limit)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

            </>

          )}
          
        </div>
        
      </div>
      
    
    )
}

export default User