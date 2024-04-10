import { useState } from "react";
import "./App.css";
import FormRemind from "./components/formRemind";
import ListRemind from "./components/listRemind";
import * as uuid from "uuid";

const keyRemindList = "_lists";

function App() {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem(keyRemindList)) || []
  );

  const renderRemindList = (_list) => {
    if (!_list.length) return;

    const reversedLists = _list.slice().reverse();
    // const visibleLists = reversedLists.slice(0, 9);
    return reversedLists.map((list) => (
      <ListRemind
        key={list.id}
        list={list}
        handleDeleteRemind={handleDeleteRemind}
      ></ListRemind>
    ));
  };

  const handleAddList = (dateRemind, contentRemind) => {
    const newList = {
      id: uuid.v4(),
      dateRemind: dateRemind,
      contentRemind: contentRemind,
      isDone: false,
    };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem(keyRemindList, JSON.stringify(updatedLists));
  };
  const handleDeleteRemind = (id) => {
    const newRemindList = lists.filter((_list) => {
      return _list.id !== id;
    });
    setLists(newRemindList);
    localStorage.setItem(keyRemindList, JSON.stringify(newRemindList));
  };

  return (
    <div className="container-full">
      <h1 className="header-title">NHẮC NHỞ NGÀY QUAN TRỌNG CỦA BẠN</h1>
      <div className="content">
        <div className="content-left">
          <FormRemind handleAddList={handleAddList}></FormRemind>
        </div>
        <div className="content-right">{renderRemindList(lists)}</div>
      </div>
    </div>
  );
}

export default App;
