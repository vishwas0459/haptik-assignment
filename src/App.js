import { useEffect, useState } from "react";
import "./App.css";
import FriendList from "./components/FriendList";
import InputField from "./components/InputField";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";
import { PAGE_SIZE } from "./constants";
import {
  getLocalStorageData,
  paginateData,
  setLocalStorageData,
} from "./utils";

function App() {
  const [deleteId, setDeleteId] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  // check if data is present in localstorage
  useEffect(() => {
    const data = getLocalStorageData();
    if (data) {
      setData(data);
    } else {
      setLocalStorageData();
    }
  }, []);

  useEffect(() => {
    if (sortBy) {
      const sortedData = [...data].sort((a, b) => {
        return a.isFav > b.isFav ? -1 : 1;
      });
      setData(sortedData);
    } else {
      setData(getLocalStorageData());
    }
    setCurrentPage(1);
  }, [sortBy]);

  const [friendData, setFriendData] = useState([]);

  useEffect(() => {
    setFriendData([...paginateData(data, currentPage, PAGE_SIZE)]);
  }, [currentPage, data]);

  // Filter the localstorage data
  useEffect(() => {
    if (name) {
      // filter the data
      const regex = new RegExp(`^${name}`, "i");
      const filtersList = data.sort().filter((v) => {
        return regex.test(v.name);
      });
      setData(filtersList);
    } else {
      setData(getLocalStorageData());
    }
  }, [name]);

  const handleAddFriend = (event) => {
    if (event.key === "Enter" && name !== "") {
      if (!/^[a-zA-Z ]*$/.test(name) || name.length < 3 || name.length > 15) {
        setError("Please enter valid name with min 3 and max 15 character!");
        return;
      }
      const storedData = getLocalStorageData();
      const isNewFriend =
        storedData.findIndex(
          (person) => person.name.toLowerCase() === name.trim().toLowerCase()
        ) === -1;
      if (isNewFriend) {
        const newFriend = {
          id: storedData.length + 1,
          name: name.trim(),
          isFav: false,
        };
        storedData.push(newFriend);
        setData(storedData);
        setLocalStorageData(storedData);
        setName("");
        setError("");
      }
    }
  };

  const handleChange = (event) => {
    const { value: name } = event.target;
    if (name.length > 20) {
      setError("Please enter max 20 character");
      return;
    }
    setError("");
    setName(name);
  };

  const handleDeleteConfirm = () => {
    const updatedData = data.filter((item) => item.id !== deleteId);
    setData(updatedData);
    setDeleteId("");
    setLocalStorageData(updatedData);

    if (data.length < currentPage * PAGE_SIZE) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const handleFavorite = (id) => {
    console.log("handleFavorite", id);
    const copiedData = [...data];
    const index = copiedData.findIndex((item) => item.id === id);
    const user = { ...copiedData[index] };
    user.isFav = !user.isFav;
    copiedData[index] = user;
    setLocalStorageData(copiedData);
    setData(copiedData);
  };

  const handleSort = () => {
    setSortBy(!sortBy);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Friends List</h1>
        <span className="icon" onClick={handleSort}>
          <i className={`${sortBy ? "fas" : "far"} fa-star`}></i>
        </span>
      </header>
      <main className="list__container">
        <InputField
          placeholder="Enter your friend's name"
          name="name"
          value={name}
          onChange={handleChange}
          onKeyPress={handleAddFriend}
          error={error}
        />
        <FriendList
          data={friendData}
          onDelete={handleDelete}
          onFavorite={handleFavorite}
        />
      </main>
      <footer>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          count={data.length}
          pageSize={PAGE_SIZE}
        />
      </footer>
      {deleteId && (
        <Modal
          content="Do you want to delete ?"
          title="Warning"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId("")}
        />
      )}
    </div>
  );
}

export default App;
