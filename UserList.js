import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users');
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} style={{width:'20%',height:'40px',marginTop:'20px',borderRadius:'10px',paddingLeft:'10px'}} />
      <div style={{width:'100%', height:'auto',display:'flex',justifyContent:'space-evenly',flexWrap:'wrap',marginTop:'60px'}}>
      {filteredUsers.map(user => (
        <div key={user.id} style={{border: '1px solid #000',width:'15%',display:'flex',flexDirection:'column',borderRadius:'18px'}}>
          <p style={{ fontWeight: 'bold',position:'absolute',marginLeft:'12%',width:'20px',backgroundColor:'black',color:'white',borderRadius:'6px' }}>{user.id}</p>
          <div style={{ display: 'inline-block', padding: '10px',borderBottom:'1px solid black'}}>
            <img
              src={user.avatar}
              alt={user.first_name}
              style={{
                borderRadius: '10%',
                display: 'block',
                margin: '0 auto',
                boxSizing: 'border-box',
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <p>{user.first_name}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default UserList;