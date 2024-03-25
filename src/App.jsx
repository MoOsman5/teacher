import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import SearchIcon from "./SVGs/SearchIcon";
import videocamera from "./assets/icons/video-camera.png";
import IdIcon from "./assets/icons/id-card-50.png";
import HomeIcon from "./SVGs/HomeIcon";
import "./App.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  let data = [
    {
      id: "1",
      firstName: "John Doe",
      lastName: "Smith",
      url: "https://th.bing.com/th/id/OIP.L8bs33mJBAUBA01wBfJnjQHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: "2",
      firstName: "Jane Smith",
      lastName: "Doe",
      url: "https://th.bing.com/th/id/OIP.L8bs33mJBAUBA01wBfJnjQHaHa?rs=1&pid=ImgDetMain",
    },
  ];
  const [classInfo, setClassInfo] = useState(null);
  const [teachers, setTeachers] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchClassInfo = async () => {
  //     try {
  //       const docSnap = await db.collection('students/class').doc('ID_CLASS_b3dd914b629d').get();
  //       if (docSnap.exists()) {
  //         setClassInfo(docSnap.data());
  //       }
  //     } catch (error) {
  //       console.error("Error fetching class info:", error);
  //     }
  //   };

  //   const fetchTeachers = async () => {
  //     try {
  //       const querySnapshot = await db.collection('teachers').get();
  //       const teachersData = querySnapshot.docs.map(doc => doc.data());
  //       setTeachers(teachersData);
  //     } catch (error) {
  //       console.error("Error fetching teachers:", error);
  //     }
  //   };

  //   fetchClassInfo();
  //   fetchTeachers();
  // }, [db]);

  // useEffect(() => {
  //   const fetchTeachers = async () => {
  //     try {
  //       const teachersCollection = collection(db, "teachers");
  //       const querySnapshot = await getDocs(teachersCollection);
  //       console.log("querySnapshot.docs:", querySnapshot.docs);
  //       const teacherData = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log("teacherData:", teacherData);
  //       setTeachers(teacherData);
  //     } catch (error) {
  //       console.error("Error fetching teachers:", error);
  //     }
  //   };

  //   fetchTeachers();
  // }, [db]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="title"> My Scool logo</div>
      <div className="title2">Class number 14</div>
      <div className="search-bar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="teacher-list">
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <div className="image-container">
              <img src={teacher.url} alt="Profile" />
            </div>
            <span>
              {teacher.firstName} {teacher.lastName}
            </span>
            <div className="videocamera-container">
              <img src={videocamera} alt="videocamera" />
            </div>
          </li>
        ))}
      </ul>
      <div className="bts-container">
        <div className="bts">
          <div className="bt">
            <img src={IdIcon} alt="ID" />
            Annuaire
          </div>
          <div className="bt2">
            <HomeIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
