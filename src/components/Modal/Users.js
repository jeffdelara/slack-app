import React from 'react'
import { useState, useEffect } from 'react';

function Users() {
  const [user, getUser] = useState(null);


  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("/api/v1/users");
      const data = await response.json();

      getUser(data) ;
    }
  }, []); 

  return (
    <div>
      {user && (
        <div className="users">
          {user.map((user, index) => (
            <div key={index}>
              <h2>{user.name}</h2>
            </div>
          ))}
  
        </div>
      )}
    </div>
  )
          }
export default Users