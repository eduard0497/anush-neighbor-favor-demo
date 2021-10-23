import React, { useState, useEffect } from "react";
import "./HomePage.css";

function HomePage() {
  let userid = sessionStorage.getItem("userid");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [favorsdone, setfavorsdone] = useState("");
  const [favorsasked, setfavorsasked] = useState("");
  const [phone, setphone] = useState("");

  const [titleToPost, setTitleToPost] = useState("");
  const [detailToPost, setDetailToPost] = useState("");

  const handleTitleToPost = (e) => {
    setTitleToPost(e.target.value);
  };

  const handleDetailToPost = (e) => {
    setDetailToPost(e.target.value);
  };

  const postUserRequest = () => {
    fetch("https://neighbor-favor.herokuapp.com/list-favor", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favortitle: titleToPost,
        favordetail: detailToPost,
        favorlistedby: userid,
        favorlistedphone: phone,
      }),
    })
      .then((response) => response.json())
      .then((text) => {
        setTitleToPost("");
        setDetailToPost("");
        window.alert(text);
      });
    setTimeout(function () {
      window.location.reload();
      return false;
    }, 1000);
  };

  const [pendingFavors, setPendingFavors] = useState([]);
  const [showPending, setShowPending] = useState(false);
  const [userListedFavors, setUserListedFavors] = useState([]);
  const [showUserListed, setShowUserListed] = useState(false);
  const [userPreviousFavors, setUserPreviousFavors] = useState([]);
  const [showUserPrevious, setShowUserPrevious] = useState(false);
  const [userCompletedFavors, setUserCompletedFavors] = useState([]);
  const [showUseCompleted, setShowUserCompleted] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState([]);

  const generalSetAllNotToShow = () => {
    setShowPending(false);
    setShowUserListed(false);
    setShowUserPrevious(false);
    setShowUserCompleted(false);
  };

  const handleShowPending = () => {
    generalSetAllNotToShow();
    setShowPending(true);
  };
  const handleShowUserListed = () => {
    generalSetAllNotToShow();
    setShowUserListed(true);
  };
  const handleShowUserPrevious = () => {
    generalSetAllNotToShow();
    setShowUserPrevious(true);
  };
  const handleShowUserCompleted = () => {
    generalSetAllNotToShow();
    setShowUserCompleted(true);
  };

  useEffect(() => {
    fetch(
      `https://neighbor-favor.herokuapp.com/get-user-details?userid=${userid}`
    )
      .then((response) => response.json())
      .then((info) => {
        setfirstname(info[0].firstname);
        setlastname(info[0].lastname);
        setemail(info[0].email);
        setfavorsdone(info[0].favorsdone);
        setfavorsasked(info[0].favorsasked);
        setphone(info[0].phone);
      });

    fetch("https://neighbor-favor.herokuapp.com/get-all-pending-favors")
      .then((response) => response.json())
      .then((info) => {
        setPendingFavors(info);
      });

    fetch(
      `https://neighbor-favor.herokuapp.com/get-user-listed-favors?id=${userid}`
    )
      .then((response) => response.json())
      .then((info) => {
        setUserListedFavors(info);
        console.log(info);
      });

    fetch(
      `https://neighbor-favor.herokuapp.com/get-user-previous-favors?id=${userid}`
    )
      .then((response) => response.json())
      .then((info) => {
        setUserPreviousFavors(info);
      });

    fetch(
      `https://neighbor-favor.herokuapp.com/get-user-completed-favors?id=${userid}`
    )
      .then((response) => response.json())
      .then((info) => {
        setUserCompletedFavors(info);
      });
    fetch("https://neighbor-favor.herokuapp.com/get-leaderboard")
      .then((response) => response.json())
      .then((info) => {
        setLeaderBoard(info);
      });
  }, []);

  const [userCompletedFavor, setUserCompletedFavor] = useState("");

  const handleUserCompletedFavor = (e) => {
    setUserCompletedFavor(e.target.value);
  };

  const completeFavor = (e) => {
    let favorid = e.target.value;
    let favorcompletedby = userCompletedFavor;
    if (!favorid || !favorcompletedby) {
      alert("Field is empty");
      return;
    }

    fetch("https://neighbor-favor.herokuapp.com/complete-favor", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favorid: favorid,
        favorcompletedby: favorcompletedby,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        alert(info);
      });
    setUserCompletedFavor("");
    setTimeout(function () {
      window.location.reload();
      return false;
    }, 1000);
  };

  const updatePage = () => {
    window.location.reload();
  };

  const logout = () => {
    sessionStorage.clear();
    setTimeout(function () {
      window.location.reload();
      return false;
    }, 1000);
  };

  return (
    <div className="homepage_container">
      <div className="homepage_navigation">
        <div className="homepage_navigation_user_information">
          <h1>User Information</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Favors Done</th>
                <th>Favors Asked</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userid}</td>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{favorsdone}</td>
                <td>{favorsasked}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="homepage_navigation_buttons">
          <button onClick={updatePage}>Refresh to get latest updates</button>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
      <div className="homepage_list_favor">
        <div className="homepage_list_favor_inputs">
          <input
            onChange={handleTitleToPost}
            type="text"
            placeholder="Enter request title here..."
            value={titleToPost}
          />
          <input
            onChange={handleDetailToPost}
            type="text"
            placeholder="Enter request details here..."
            value={detailToPost}
          />
        </div>
        <button onClick={postUserRequest}>Post Request</button>
      </div>
      <div className="homepage_body_container">
        <div className="homepage_body_container_left">
          <div className="homepage_body_container_left_buttons">
            <button onClick={handleShowPending}>Pending</button>
            <button onClick={handleShowUserListed}>My Listings</button>
            <button onClick={handleShowUserPrevious}>My Previous</button>
            <button onClick={handleShowUserCompleted}>Favors done by me</button>
          </div>
          <div className="homepage_body_container_left_body">
            {showPending
              ? pendingFavors.map((favor) => {
                  return (
                    <div key={favor.favorid} className="lisings_container">
                      <div className="lisings_container_details">
                        <h1>{favor.favortitle}</h1>
                        <h3>{favor.favordetail}</h3>
                      </div>
                      <div className="lisings_container_call">
                        <p>Call to help: {favor.favorlistedphone}</p>
                      </div>
                    </div>
                  );
                })
              : null}
            {showUserListed
              ? userListedFavors.map((favor) => {
                  return (
                    <div key={favor.favorid} className="lisings_container">
                      <div className="lisings_container_details">
                        <h1>{favor.favortitle}</h1>
                        <h3>{favor.favordetail}</h3>
                      </div>
                      <div className="lisings_container_complete_favor">
                        <input
                          onChange={handleUserCompletedFavor}
                          type="text"
                          placeholder="Person ID who did the favor..."
                        />
                        <button onClick={completeFavor} value={favor.favorid}>
                          Complete!
                        </button>
                      </div>
                    </div>
                  );
                })
              : null}
            {showUserPrevious
              ? userPreviousFavors.map((favor) => {
                  return (
                    <div key={favor.favorid} className="lisings_container">
                      <div className="lisings_container_details">
                        <h1>{favor.favortitle}</h1>
                        <h3>{favor.favordetail}</h3>
                      </div>
                      <div className="lisings_container_favor_completed_by">
                        <h3>
                          ID of Person Completed Favor: {favor.favorcompletedby}
                        </h3>
                      </div>
                    </div>
                  );
                })
              : null}
            {showUseCompleted
              ? userCompletedFavors.map((favor) => {
                  return (
                    <div key={favor.favorid} className="lisings_container">
                      <div className="lisings_container_details">
                        <h1>{favor.favortitle}</h1>
                        <h3>{favor.favordetail}</h3>
                      </div>
                      <div className="lisings_container_favors_done_by_me">
                        <h3>Person Posted Favor: {favor.favorlistedby}</h3>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="homepage_body_container_right">
          <h1>All User's Board</h1>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Favord Done</th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard
                .sort((a, b) => (a.favorsdone > b.favorsdone ? -1 : 1))
                .map((item) => {
                  return (
                    <tr key={item.userid}>
                      <td>{item.userid}</td>
                      <td>{item.email}</td>
                      <td>{item.firstname}</td>
                      <td>{item.favorsdone}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
