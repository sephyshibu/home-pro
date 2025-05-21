// import React, { useEffect, useState } from "react";
// import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
// import { searchtech } from "../../../api/AdminApi/Searchtech/searchTech";
// interface Tech{
//     _id:string,
//     email:string,
//     phone:string,
//     isBlocked:boolean
// }

// const TechList:React.FC=()=>{
//     const[techs, settech]=useState<Tech[]>([])
//     const[loading,setloading]=useState(false)
//     const[sortOrder,setsortOrder]=useState<'asc'|'desc'>('asc')
//     const[searchterm,setsearchterm]=useState('')
//     const[currentPage,setcurrentPage]=useState(1)
//     const [total, setTotal] = useState(0);
//     const limit=5

//     useEffect(()=>{
//         fetchtech()
//     },[sortOrder,currentPage])

//     const toggleSortOrder=()=>{
//       setsortOrder((prev)=>prev==='asc'?'desc':'asc')
//     }

//     const fetchtech=async()=>{
//         try {
//             const response=await axiosInstanceadmin.get(`/fetchtech?sortBy=name&order=${sortOrder}&page=${currentPage}`)
//             settech(response.data?.tech)
//             setTotal(response.data.total)
//         }catch (error) {
//             console.error('Failed to fetch tech', error);
            
//         }
//     }

//     const handleToggle = async (techId: string, isBlocked: boolean) => {
//       try {
//         const updatedStatus = !isBlocked;
//         await axiosInstanceadmin.patch(`/tech/${techId}`, { isBlocked: updatedStatus });

//         // Update the specific tech in local state
//         settech((prevTechs) =>
//           prevTechs.map((tech) =>
//             tech._id === techId ? { ...tech, isBlocked: updatedStatus } : tech
//           )
//         );
//       } catch (error) {
//         console.error("Error toggling block status", error);
//       }
//     };

//   const handleSearchTech=async(e:React.ChangeEvent<HTMLInputElement>)=>{
//     setsearchterm(e.target.value)
  
//   }

//   useEffect(()=>{
//     const debouncedelay=setTimeout(async()=>{
//       try {
//         if(searchterm.trim()==""){
//           fetchtech()
//         }
//         else{
//           const response=await searchtech(searchterm)
//           settech(response.data.tech)
//         }
//       } catch (error) {
//         console.error('Search failed', error);
//       } finally {
//           setloading(false);
//       }
//     },500)

//     return()=>clearInterval(debouncedelay)
//   },[searchterm])


//     return(
//         <div className="flex-grow p-8">
//         <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
//           <h2 className="text-2xl font-bold mb-4 text-gray-700">Tech List</h2>
//           {loading ? (
//             <div className="text-center text-lg text-gray-500">Loading...</div>
//           ) : (
//             <>
//             <div className="search-options">
//               <input
//                   type="text"
//                   value={searchterm}
//                   onChange={handleSearchTech}
//                   placeholder="enter the tech name"
//                   className="search-input"
//                   />
//             </div>
           
//             <table className="min-w-full table-auto text-left">
//               <thead>
//                 <tr className="text-gray-600 uppercase text-sm leading-normal">
//                   <th className="px-6 py-3 cursor-pointer" onClick={toggleSortOrder}>
//                     Email {sortOrder === 'asc' ? '↑' : '↓'}
//                   </th>
//                   <th className="px-6 py-3">Phone Number</th>
                 
//                   <th className="px-6 py-3">Status</th>
//                   <th className="px-6 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm font-light">
//                 {techs.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center py-6">
//                       No tech Found
//                     </td>
//                   </tr>
//                 ) : (
//                   techs.map((tech) => (
//                     <tr key={tech._id} className="border-b border-gray-200 hover:bg-gray-100">
//                       <td className="px-6 py-4">{tech.email}</td>
//                       <td className="px-6 py-4">{tech.phone}</td>
//                       <td className="px-6 py-4">{tech.isBlocked ? "Blocked" : "Active"}</td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => handleToggle(tech._id, tech.isBlocked)}
//                           className={`px-4 py-2 rounded-md text-white ${
//                             tech.isBlocked ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         >
//                           {tech.isBlocked ? "Unblock" : "Block"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//              <div className="flex justify-center mt-4 gap-2">
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
//              </>
//           )}
//         </div>
//       </div>
    
//     )
// }

// export default TechList

import React, { useEffect, useState } from "react";
import axiosInstanceadmin from "../../../Axios/AdminAxios/axios";
import { searchtech } from "../../../api/AdminApi/Searchtech/searchTech";
import SearchInput from "../SearchBAr";
import Table from "../Table";

interface Tech {
  _id: string;
  email: string;
  phone: string;
  isBlocked: boolean;
}

const TechList: React.FC = () => {
  const [techs, setTech] = useState<Tech[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    fetchTech();
  }, [sortOrder, currentPage]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const fetchTech = async () => {
    setLoading(true);
    try {
      const response = await axiosInstanceadmin.get(
        `/fetchtech?sortBy=email&order=${sortOrder}&page=${currentPage}`
      );
      setTech(response.data?.tech);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Failed to fetch tech", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (techId: string, isBlocked: boolean) => {
    try {
      const updatedStatus = !isBlocked;
      await axiosInstanceadmin.patch(`/tech/${techId}`, { isBlocked: updatedStatus });

      setTech((prevTechs) =>
        prevTechs.map((tech) =>
          tech._id === techId ? { ...tech, isBlocked: updatedStatus } : tech
        )
      );
    } catch (error) {
      console.error("Error toggling block status", error);
    }
  };

  const handleSearchTech = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const debounceDelay = setTimeout(async () => {
      setLoading(true);
      try {
        if (searchTerm.trim() === "") {
          fetchTech();
        } else {
          const response = await searchtech(searchTerm);
          setTech(response.data.tech);
          setTotal(response.data.tech.length); // adjust if needed
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceDelay);
  }, [searchTerm]);

  const columns = [
    {
      label: `Email ${sortOrder === "asc" ? "↑" : "↓"}`,
      key: "email",
      onClick: toggleSortOrder,
      sortable: true,
    },
    { label: "Phone Number", key: "phone" },
    { label: "Status", key: "status" },
    { label: "Action", key: "action" },
  ];

  return (
    <div className="flex-grow p-8">
      <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Tech List</h2>
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading...</div>
        ) : (
          <>
            <SearchInput
              value={searchTerm}
              onChange={handleSearchTech}
              placeholder="Enter the tech name"
              className="w-64"
            />

            <Table
              columns={columns}
              data={techs}
              renderRow={(tech) => (
                <tr key={tech._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4">{tech.email}</td>
                  <td className="px-6 py-4">{tech.phone}</td>
                  <td className="px-6 py-4">{tech.isBlocked ? "Blocked" : "Active"}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggle(tech._id, tech.isBlocked)}
                      className={`px-4 py-2 rounded-md text-white ${
                        tech.isBlocked ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {tech.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              )}
            />

            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="px-3 py-1">{currentPage}</span>
              <button
                onClick={() => {
                  const totalPages = Math.ceil(total / limit);
                  setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
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
  );
};

export default TechList;
