import React, { useEffect, useState } from 'react';
import axiosInstanceuser from '../../axios';

interface Category{
  _id:string,
  name:string, 
  description:string,
  image:string
}

const Services: React.FC = () => {

  const[categories,setcategories]=useState<Category[]>([])
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  useEffect(()=>{
    const fetchcategory=async()=>{
      try {
        const response= await axiosInstanceuser.get('/fetchcategory')
        const categories=response.data.category.filter((cat:any)=>cat.isBlocked===false)
        setcategories(categories)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchcategory()
  },[])
  const toggleExpand = (id: string) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };

    return (
        <section className="py-12 bg-gray-50">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold">Our Services</h3>
          <p className="text-gray-500 mt-2">All your home service needs in one place</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6 px-6">
        {categories.map((category) => {
          const isExpanded = expandedCard === category._id;
          const shortDesc = category.description.slice(0, 80) + (category.description.length > 80 ? "..." : "");

          return (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-4 text-center">
              <img
                src={category.image}
                alt={category.name}
                className="rounded-md h-24 mx-auto mb-2 object-cover"
              />
              <h4 className='font-semibold'>{category.name}</h4>
              <p className='text-sm text-gray-500'>
                {isExpanded ? category.description : shortDesc}
              </p>
              {category.description.length > 80 && (
                <button
                  onClick={() => toggleExpand(category._id)}
                  className="text-blue-500 text-sm mt-2"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          );
        })}
        </div>
        </section>
    )
  };
  
  export default Services;
  