import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getList, addList } from "./store/list/listSlice";
import List from "./components/List";

function App() {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.list);
  const [listValue, setListValue] = useState("");
  const [cateValue, setCateValue] = useState("");
  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);
  const onSelect = (e) => {
    setCateValue(e.target.value);
  };
  const onCreate = (e) => {
    e.preventDefault();
    if (listValue && cateValue !== "") {
      const newList = { content: listValue, category: cateValue };
      dispatch(addList(newList));
      setListValue("");
    } else {
      window.alert("카테고리를 선택해주세요");
    }
  };

  return (
    <div className="App">
      <form onSubmit={onCreate}>
        <h1>{listData.message}</h1>
        <div className="list">
          {listData.data.map((ele) => (
            <List
              key={ele.id}
              id={ele.id}
              content={ele.content}
              check={ele.check}
              category={ele.category}
            />
          ))}
        </div>
        <div className="addList">
          <select required defaultValue="default" onChange={onSelect}>
            <option value="default" disabled>
              --선택--
            </option>
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
          </select>
          <input
            type="text"
            onChange={(e) => setListValue(e.target.value)}
            value={listValue}
            maxLength={20}
            required
          />
          <button type="submit">목록추가</button>
        </div>
      </form>
    </div>
  );
}

export default App;
