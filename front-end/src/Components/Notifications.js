import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../Util/apiURL.js";
const API = apiURL();

export default function Reviews() {
  const [profile, setProfile] = useState([]);
  const [match, setMatch] = useState([]);
  const [pending, setPending] = useState([]);

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`${API}/users/14`);
      console.log(data[0]);
      setProfile(data[0]);
      setMatch(data[0].matchrequests);
      setPending(data[0].pendingreview);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    return getProfile();
  }, []);

  return (
    <div>
        <h3>Notifications</h3>
      <p>
      Pending Reviews: {pending.pendingReview ? <p>Pending</p> : "None"}
      </p>
      <p>
      Karma Stars: {profile.karma}
      </p>
      <p>
      Match Accepted:{match.acceptedMatchesHistory}
      </p>
      <p>
      Match Requests: {match.matchRequests}
      </p>
    </div>
  );
}
