import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection,getDoc, getDocs ,doc} from "firebase/firestore";
import SearchIcon from "./SVGs/SearchIcon";
import videocamera from "./assets/icons/video-camera.png";
import IdIcon from "./assets/icons/id-card-50.png";
import HomeIcon from "./SVGs/HomeIcon";
import "./App.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC28snX29YxoUqRYt5X5UjackWLX56v8Jo",
  authDomain: "teacher-48ab7.firebaseapp.com",
  projectId: "teacher-48ab7",
  storageBucket: "teacher-48ab7.appspot.com",
  messagingSenderId: "435756635268",
  appId: "1:435756635268:web:eec517e83df39dc02f1ed1",
  measurementId: "G-BBS6Q3F628"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [classInfo, setClassInfo] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClassInfo = async (classId) => {
      try {
        const classRef = doc(db, 'class', classId); 
        const classSnapshot = await getDoc(classRef);
        if (classSnapshot.exists()) {
          setClassInfo(classSnapshot.data());
        } else {
          console.log('Class not found');
        }
      } catch (error) {
        console.error('Error fetching class information:', error);
      }
    };
    fetchClassInfo('zBvstWRLAThhskH03Zp5');
  }, [db]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, "teachers");
        const querySnapshot = await getDocs(teachersCollection);
        const teacherData = querySnapshot.docs
          .filter(doc => doc.data().class_id === 'zBvstWRLAThhskH03Zp5') // Filter teachers by class_id
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, [db]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`;
    return fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="title"> My School Logo</div>
      {console.log('classInfo',classInfo)}
      <div className="title2">Class number {classInfo?.number}</div>
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
        {filteredTeachers.map((teacher) => (
          <li key={teacher.id}>
            <div className="image-container">
              <img src={teacher.imageURL} alt="Profile" />
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
