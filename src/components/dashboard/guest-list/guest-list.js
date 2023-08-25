// import * as  from "../../users/service";
// import * as enrollmentService from "./service";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// function UserEnrollments() {
//   const { eventId } = useParams();

//   const [selectedUser, setSelectedUser] = useState("");
//   const [users, setUsers] = useState([]);
//   const [enrollments, setEnrollments] = useState([]);

//   const loadUsers = async () => {
//     const users = await userService.getUsers();
//     setUsers(users);
//   };

//   const handleEnroll = async () => {
//     const enrollment = {
//       user: selectedUser,
//       section: sectionId,
//     };
//     await enrollmentService.createEnrollment(enrollment);
//     loadEnrollments();
//   };

//   const loadEnrollments = async () => {
//     const enrollments = await enrollmentService.findEnrollmentsBySection(
//       sectionId
//     );
//     setEnrollments(enrollments);
//   };

//   useEffect(() => {
//     loadUsers();
//     loadEnrollments();
//   }, []);

//   return (
//     <div>
//       <h3>Users</h3>
//       <div className="mb-2">
//         <button onClick={handleEnroll} className="btn btn-success float-end">
//           Enroll
//         </button>
//         <select
//           onChange={(e) => setSelectedUser(e.target.value)}
//           className="form-control w-75"
//         >
//           {users.map((user) => (
//             <option key={user._id} value={user._id}>
//               {user.username}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ul className="list-group">
//         {enrollments.map((enrollment) => (
//           <li key={enrollment._id} className="list-group-item">
//             <button className="btn btn-danger float-end">Unenroll</button>
//             <button className="btn btn-warning float-end me-2">Edit</button>
//             <div className="mt-1">
//               <Link to={`/canvas/users/${enrollment.user._id}`}>
//                 {enrollment.user.firstName} {enrollment.user.lastName} (
//                 {enrollment.user.username})
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default UserEnrollments;
