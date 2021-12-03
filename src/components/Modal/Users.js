import { useState, useEffect } from 'react';

function Users() {
  const [user, getUser] = useState(null);

  // + adding the use
  useEffect(() => {
    getData();

    async function getData() {
      const response = await fetch("");
      const data = await response.json();

      getUser(data) ;
    }
  }, []); 

  return (
    <div>
      {user && (
        <div className="users">
  
          {/* loop over the books */}
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