// import React, { Component } from "react";
// import Modal from "./components/Modal";
// import axios from "axios";

// interface TodoItem {
//   id?: number;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// interface AppState {
//   viewCompleted: boolean;
//   todoList: TodoItem[];
//   modal: boolean;
//   activeItem: TodoItem;
// }

// class App extends Component<{}, AppState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       viewCompleted: false,
//       todoList: [],
//       modal: false,
//       activeItem: {
//         title: "",
//         description: "",
//         completed: false,
//       },
//     };
//   }

//   componentDidMount() {
//     this.refreshList();
//   }

//   refreshList = () => {
//     axios
//       .get("/api/todos/")
//       .then((res) => this.setState({ todoList: res.data }))
//       .catch((err) => console.log(err));
//   };

//   toggle = () => {
//     this.setState({ modal: !this.state.modal });
//   };

//   handleSubmit = (item: TodoItem) => {
//     this.toggle();

//     if (item.id) {
//       axios
//         .put(`/api/todos/${item.id}/`, item)
//         .then((res) => this.refreshList());
//       return;
//     }
//     axios
//       .post("/api/todos/", item)
//       .then((res) => this.refreshList());
//   };

//   handleDelete = (item: TodoItem) => {
//     axios
//       .delete(`/api/todos/${item.id}/`)
//       .then((res) => this.refreshList());
//   };

//   createItem = () => {
//     const item: TodoItem = { title: "", description: "", completed: false };

//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   editItem = (item: TodoItem) => {
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   displayCompleted = (status: boolean) => {
//     this.setState({ viewCompleted: status });
//   };

//   renderTabList = () => {
//     return (
//       <div className="nav nav-tabs">
//         <span
//           onClick={() => this.displayCompleted(true)}
//           className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
//         >
//           Complete
//         </span>
//         <span
//           onClick={() => this.displayCompleted(false)}
//           className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
//         >
//           Incomplete
//         </span>
//       </div>
//     );
//   };

//   renderItems = () => {
//     const { viewCompleted, todoList } = this.state;
//     const newItems = todoList.filter(
//       (item) => item.completed === viewCompleted
//     );

//     return newItems.map((item) => (
//       <li
//         key={item.id}
//         className="list-group-item d-flex justify-content-between align-items-center"
//       >
//         <span
//           className={`todo-title mr-2 ${
//             this.state.viewCompleted ? "completed-todo" : ""
//           }`}
//           title={item.description}
//         >
//           {item.title}
//         </span>
//         <span>
//           <button
//             className="btn btn-secondary mr-2"
//             onClick={() => this.editItem(item)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => this.handleDelete(item)}
//           >
//             Delete
//           </button>
//         </span>
//       </li>
//     ));
//   };

//   render() {
//     return (
//       <main className="container">
//         <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
//         <div className="row">
//           <div className="col-md-6 col-sm-10 mx-auto p-0">
//             <div className="card p-3">
//               <div className="mb-4">
//                 <button
//                   className="btn btn-primary"
//                   onClick={this.createItem}
//                 >
//                   Add task
//                 </button>
//               </div>
//               {this.renderTabList()}
//               <ul className="list-group list-group-flush border-top-0">
//                 {this.renderItems()}
//               </ul>
//             </div>
//           </div>
//         </div>
//         {this.state.modal ? (
//           <Modal
//             activeItem={this.state.activeItem}
//             toggle={this.toggle}
//             onSave={this.handleSubmit}
//           />
//         ) : null}
//       </main>
//     );
//   }
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// inspiration for this comes from Georgia Tech student Kevin Yan
// repo I used for inspiration: https://github.com/KevinYan2025/custos/blob/main/src/pages/LoginPage.jsx
// I used a different UI entirely and different ways for generating the code verifier, code challenge, and generating state

// Login function
const login = (custosClientId: string, redirectUrl: string) => {
  const generateCodeVerifier = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
    const length = 128;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeVerifier += characters[randomIndex];
    }
    return codeVerifier;
  };

  const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const generateState = (): string => {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, (byte: number) => ('0' + byte.toString(16)).slice(-2)).join('');
  };

  const codeVerifier = generateCodeVerifier();
  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    const state = generateState();

    const custosAuthUrl =
      `https://api.playground.usecustos.org/api/v1/identity-management/authorize?response_type=code&client_id=${custosClientId}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&scope=openid+profile+email&state=${encodeURIComponent(state)}&code_challenge=${encodeURIComponent(
        codeChallenge
      )}&code_challenge_method=S256`;

    localStorage.setItem('pkce_code_verifier', codeVerifier);
    localStorage.setItem('state', state);
    localStorage.setItem('redirectUrl', redirectUrl);
    localStorage.setItem('custosClientId', custosClientId);

    window.location.href = custosAuthUrl;
  });
};

const App: React.FC = () => {
  const [custosClientId, setCustosClientId] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('http://localhost:3000/callback');
  const [isAdmin, setIsAdmin] = useState(false); // State for admin status
  const [todoList, setTodoList] = useState([]); // State for Todo list

  // Check admin status on load or login
  useEffect(() => {
    const userId = "replace_with_user_id"; // Replace with the actual user ID
    axios.get(`/toggle-admin/${userId}/`)
      .then(response => {
        setIsAdmin(response.data.isAdmin); // Assuming backend response has {"isAdmin": true/false}
      })
      .catch(error => {
        console.error('Error fetching admin status:', error);
      });
  }, []);

  // Fetch Todo list if user is an admin
  useEffect(() => {
    if (isAdmin) {
      axios.get('/api/todos/')
        .then(response => {
          setTodoList(response.data); // Set the fetched Todo list
        })
        .catch(error => {
          console.error('Error fetching todo list:', error);
        });
    }
  }, [isAdmin]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(custosClientId, redirectUrl);
  };

  // Toggle Admin Status
  const toggleAdminStatus = () => {
    const userId = "replace_with_user_id"; // Replace with the actual user ID
    axios.post(`/toggle-admin/${userId}/`)
      .then(response => {
        setIsAdmin(response.data.isAdmin); // Update admin status
      })
      .catch(error => {
        console.error('Error toggling admin status:', error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '20rem' }}>
        <h3 className="card-title text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="custosClientId" className="form-label">Custos Client ID</label>
            <input 
              type="text" 
              className="form-control" 
              id="custosClientId" 
              placeholder="Enter Custos Client ID" 
              value={custosClientId}
              onChange={(e) => setCustosClientId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="redirectUrl" className="form-label">Redirect URL</label>
            <input 
              type="url" 
              className="form-control" 
              id="redirectUrl" 
              placeholder="Enter Redirect URL" 
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        {/* Toggle Admin Status Button */}
        <button onClick={toggleAdminStatus} className="btn btn-secondary w-100 mt-3">
          {isAdmin ? 'Remove Admin Access' : 'Grant Admin Access'}
        </button>

        {/* Admin-only Todo List */}
        {isAdmin && (
          <div className="mt-4">
            <h5>Admin Todo List</h5>
            <ul className="list-group list-group-flush">
              {todoList.map((todo: any) => (
                <li key={todo.id} className="list-group-item">
                  <strong>{todo.title}</strong>: {todo.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
