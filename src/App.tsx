import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { signInAnonymously, UserCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Chart from "./components/Chart";
import { Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import { db } from "./firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";

import { EloPoint } from "./models";
import Navigation from "./components/navigation";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";

const App: React.FC = () => {
  const [user, setUser] = useState<UserCredential["user"] | undefined>();
  const [chartData, setChartData] = useState<Array<Array<EloPoint>> | []>();
  const [userId, setUserId] = useState("");

  const signIn = async () => {
    const credential: UserCredential = await signInAnonymously(auth);
    setUser(credential.user);
    setUserId(credential.user.uid);

    const userDoc = (
      await getDoc(doc(db, "users", credential.user.uid))
    ).data();
    if (userDoc === undefined) {
      await setDoc(doc(db, "users", credential.user.uid), {
        name: "Anonymous",
        miseryScore: 0,
        saved: false,
      });
    }
  };

  // mount loop (ideally)
  useEffect(() => {
    signIn();
    getChartData();
  }, []);

  const getChartData = async () => {
    const twinsElo: Array<EloPoint> = (
      await getDoc(doc(db, "team_info", "Minnesota Twins"))
    ).data().elo_history;
    const yankeesElo: Array<EloPoint> = (
      await getDoc(doc(db, "team_info", "New York Yankees"))
    ).data().elo_history;

    setChartData([twinsElo, yankeesElo]);
  };

  return (
    <div className="App-custom">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams auth={user} />} />
        <Route path="/leaderboard" element={<Leaderboard auth={userId} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Chart series={chartData} />
    </div>
  );
};

export default App;
