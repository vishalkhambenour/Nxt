import React, { useEffect, useState } from "react";
import stylecreatelist from "./createlist.module.scss";
import Scrollbars from "react-custom-scrollbars";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

function Createlist({
  selectedLists,
  addlist,
  setaddlist,
  setcreate,
  setSelectedLists,
  setfill,
}) {
  let [newlist, setnewlist] = useState([]);
  let [thirdlist, setthirdlist] = useState([]);
  useEffect(() => {
    let selectedLists2 = JSON.parse(JSON.stringify(selectedLists));
    setnewlist(selectedLists2);
  }, [selectedLists]);

  let pushforword = (i) => {
    let getsinglelist = newlist[0].splice(i, 1);
    setthirdlist([...thirdlist, ...getsinglelist]);
  };
  let newlistback = (i) => {
    let getsinglelist = thirdlist.splice(i, 1);
    let newarray = [...newlist[0], ...getsinglelist];
    setnewlist([newarray, newlist[1]]);
  };

  let newlistforword = (i) => {
    let getsinglelist = thirdlist.splice(i, 1);
    let newarray = [...newlist[1], ...getsinglelist];
    setnewlist([newlist[0], newarray]);
  };
  let pushback = (i) => {
    let getsinglelist = newlist[1].splice(i, 1);
    setthirdlist([...thirdlist, ...getsinglelist]);
  };

  let uppdatelist = () => {
    console.log(...addlist);
    setaddlist([...addlist, ...newlist, thirdlist]);
    setcreate(false);
    setSelectedLists([]);
    setfill([]);
  };
  let handleCancelCreation = () => {
    setcreate(false);
    setSelectedLists([]);
    setfill([]);
    setnewlist([]);
    setthirdlist([]);
    setaddlist([...addlist, ...selectedLists]);
  };

  return (
    <div className={stylecreatelist.list}>
      <div className={stylecreatelist.mainlist}>
        <div className={stylecreatelist.Scrollbars}>
          <Scrollbars>
            <div className={stylecreatelist.list1}>
              <label htmlFor={`List1}`}>List1</label>
              {newlist[0]?.map(
                ({ id, description, name, list_number }, index) => {
                  return (
                    <div key={id} className={stylecreatelist.sublist1}>
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <div className={stylecreatelist.subbutton1}>
                        <button onClick={() => pushforword(index)}>
                          <ArrowForward />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </Scrollbars>
        </div>
        <div className={stylecreatelist.Scrollbars}>
          <Scrollbars>
            <div className={stylecreatelist.list1}>
              <label htmlFor={`List1}`}>List{newlist.length + 1}</label>
              {thirdlist.map(
                ({ id, description, name, list_number }, index) => {
                  return (
                    <div key={id} className={stylecreatelist.sublist1}>
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <div className={stylecreatelist.subbutton1}>
                        {" "}
                        <button onClick={() => newlistback(index)}>
                          <ArrowBack />
                        </button>
                        <button onClick={() => newlistforword(index)}>
                          <ArrowForward />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </Scrollbars>
        </div>
        <div className={stylecreatelist.Scrollbars}>
          <Scrollbars>
            <div className={stylecreatelist.list1}>
              <label>List2</label>
              {newlist[1]?.map(
                ({ id, description, name, list_number }, index) => {
                  return (
                    <div key={id} className={stylecreatelist.sublist1}>
                      <h3>{name}</h3>
                      <p>{description}</p>
                      <div className={stylecreatelist.subbutton1}>
                        <button onClick={() => pushback(index)}>
                          <ArrowBack />
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </Scrollbars>
        </div>
      </div>
      <div className={stylecreatelist.buttons}>
        <button className={stylecreatelist.btn1} onClick={handleCancelCreation}>
          Cancel
        </button>
        <button className={stylecreatelist.btn2} onClick={uppdatelist}>
          update
        </button>
      </div>
    </div>
  );
}

export default Createlist;
