import axios from "axios";
import React, { useEffect, useState } from "react";
import Createlist from "../createnewlist/Createlist";
import stylefirstlist from "./firstlist.module.css";
import { Scrollbars } from "react-custom-scrollbars";

function Fistlist() {
  const [loading, setLoading] = useState(true);
  const [addlist, setaddlist] = useState([]);
  const [create, setcreate] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [fill, setfill] = useState([]);

  let getlist = async () => {
    try {
      let { data } = await axios("https://apis.ccbp.in/list-creation/lists");
      setaddlist([
        data.lists.slice(0, 25),
        data.lists.slice(25, data.lists.length),
      ]);
      setLoading(false);
    } catch (error) {
      setError1(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getlist();
  }, []);
  const handleTryAgain = () => {
    window.location.reload();
    // getlist();
  };
  if (loading) {
    return <div>Loader...</div>;
  }
  if (error1) {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/content/react-js/list-creation-failure-lg-output.png"
          alt="Failure View"
        />
        <button onClick={handleTryAgain}>Try Again</button>
      </div>
    );
  }

  const createnewlist = () => {
    if (selectedLists.length !== 2) {
      setError(`You should select exactly 2 lists to create a new list`);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } else {
      setcreate(true);

      const listsToRemove = selectedLists.filter((selectedList) =>
        addlist.some((existingList) =>
          existingList.every((item) => selectedList.includes(item))
        )
      );

      if (listsToRemove.length > 0) {
        const updatedAddList = addlist
          .map((existingList) =>
            existingList.filter(
              (item) =>
                !listsToRemove.some((selectedList) =>
                  selectedList.includes(item)
                )
            )
          )
          .filter((existingList) => existingList.length > 0);
        setaddlist(updatedAddList);
      }
    }
  };
  const clicked = (i) => {
    if (fill.includes(i)) {
      const updatedSelectedLists = selectedLists.filter(
        (list, index) => index !== fill.indexOf(i)
      );
      setSelectedLists(updatedSelectedLists);
      setfill(fill.filter((index) => index !== i));
    } else {
      setSelectedLists([...selectedLists, addlist[i]]);

      setfill([...fill, i]);
    }
  };

  {
    if (!create) {
      return (
        <div className={stylefirstlist.main}>
          <div className={stylefirstlist.listcreation}>
            <h1>List creation</h1>
            <button
              onClick={createnewlist}
              className={stylefirstlist.createbtn}
            >
              Create new list
            </button>
            <p>{error}</p>
          </div>
          <div className={stylefirstlist.display}>
            {addlist.map((arr, index) => {
              return (
                <div className={stylefirstlist.Scrollbars}>
                  <Scrollbars>
                    <div key={index} className={stylefirstlist.mapelement}>
                      <div className={stylefirstlist.checkbox}>
                        <input
                          type="checkbox"
                          name={`List${index + 1}`}
                          id={`List${index + 1}`}
                          onClick={() => clicked(index)}
                        />
                        <label htmlFor={`List${index + 1}`}>
                          List{index + 1}
                        </label>
                      </div>
                      {arr.map(({ id, description, name, list_number }) => {
                        return (
                          <div key={id} className={stylefirstlist.maped}>
                            <h3>{name}</h3>
                            <p>{description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </Scrollbars>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <Createlist
          selectedLists={selectedLists}
          addlist={addlist}
          setaddlist={setaddlist}
          setcreate={setcreate}
          setSelectedLists={setSelectedLists}
          setfill={setfill}
        />
      );
    }
  }
}

export default Fistlist;
