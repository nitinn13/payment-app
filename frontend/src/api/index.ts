// const getUsers = async () => {
//     try {
//       const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/all-users', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const data = await response.json();
//       setUsers(data.users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
      
//     }
//     setIsLoading(false);
//   };
//   const getTransactions = async () => {
//     try {
//       const response = await fetch('https://payment-app-backend-dulq.onrender.com/transaction/my-transactions', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const data = await response.json();
//       setTransactions(data.transactions);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
      
//     }
//     setIsLoading(false);
//   };
//   const getBalance = async () => {
//     try {
//       const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/my-balance', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const data = await response.json();
//       setBalance(data.balance.balance);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//       setBalance(2847.50); // Mock balance
//     }
//   };
//   const mydetails = async () => {
//     try {
//       const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/me', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const data = await response.json();
//       setMe(data.user);
//     } catch (error) {
//       console.error('Error fetching user details:', error);
      
//     }
//   };