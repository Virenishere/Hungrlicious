import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      
      // Log the response to ensure you are getting the message
      console.log(response.data);
  
      // Check if response contains a message
      if (response.data.message) {
        // Show success toast
        toast.success(response.data.message);
        
        // Fetch the updated list
        await fetchList();
      } else {
        // If no message, show error toast
        toast.error("Error removing food item");
      }
    } catch (error) {
      // Catch any other errors and display them
      toast.error("An error occurred while deleting the food item");
    }
  };
  
  

  useEffect(() => {
    fetchList();
  }, []);
  return <div className="list add flex-col">
    <p>All Food List</p>
    <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Actions</b>
        </div>
        {list.map((item,index)=>{
            return (
                <div key={index} className="list-table-format">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}</p>
                    <p onClick={()=>removeFood(item._id)} className="cursor">X</p>
                </div>
            )
        })}
    </div>
  </div>;
};

export default List;
