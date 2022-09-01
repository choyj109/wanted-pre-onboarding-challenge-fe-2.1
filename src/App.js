import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getList, addList, deleteAllList } from "./store/list/listSlice";
import List from "./components/List";

function App() {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.list);
  const [listValue, setListValue] = useState("");
  const [cateValue, setCateValue] = useState("");
  const [hashValue, setHashValue] = useState("");

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);
  const onSelect = (e) => {
    setCateValue(e.target.value);
  };
  const onCreate = (e) => {
    e.preventDefault();
    if (listValue && cateValue !== "") {
      const newList = {
        content: listValue,
        category: cateValue,
        hashtags: hashValue.split(",").map((word) => `#${word}`),
      };
      dispatch(addList(newList));
      setListValue("");
      setHashValue("");
    } else {
      window.alert("카테고리를 선택해주세요");
    }
  };

  const onAllDelete = (e) => {
    e.preventDefault();
    if (window.confirm("전부 삭제하겠습니까?")) {
      dispatch(deleteAllList());
    } else {
      window.alert("취소되었습니다");
    }
  };

  return (
    <div className="App">
      <form className="search">
        <input id="search" type="search" name="q" placeholder="검색" required />
        <label htmlFor="search">검색</label>
      </form>
      <div className="list">
        {listData.data.map((ele) => (
          <List
            key={ele.id}
            id={ele.id}
            content={ele.content}
            check={ele.check}
            category={ele.category}
            hashtags={ele.hashtags}
          />
        ))}
      </div>
      <form className="addList" onSubmit={onCreate}>
        <select required defaultValue="default" onChange={onSelect}>
          <option value="default" disabled>
            --선택--
          </option>
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </select>
        <div className="inputBox">
          <input
            type="text"
            onChange={(e) => setListValue(e.target.value)}
            value={listValue}
            maxLength={20}
            placeholder="내용"
            required
          />
          <input
            type="text"
            onChange={(e) => setHashValue(e.target.value)}
            placeholder="해시태그"
            value={hashValue}
          />
        </div>
        <button type="submit">목록추가</button>
      </form>
      <div className="deleteBtn">
        <button type="button" onClick={onAllDelete}>
          모두 삭제
        </button>
      </div>
    </div>
  );
}

export default App;
