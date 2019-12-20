import React, { SFC, useState, useEffect } from "react";
import userService from "../services/user.service";
import moment from "moment";
import ProfileLoader from "../components/loaders/profile.loader";

export interface Props {
  match: any;
  history: any;
}

const ProfilePage: SFC<Props> = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const id: number = parseInt(match.params.id);

  useEffect(() => {
    userService
      .find(id)
      .then((data: any) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        history.replace("/not-found");
      });
  }, []);

  return (
    <div className="profilePage">
      {loading && <ProfileLoader />}
      {!loading && user && (
        <>
          <div className="profilePage__header">
            <img src={`../img/users/${user.avatar}`} alt="User's avatar" />
            <h1>{user.username}</h1>
            <p>Joined {moment(user.createdAt).fromNow()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
