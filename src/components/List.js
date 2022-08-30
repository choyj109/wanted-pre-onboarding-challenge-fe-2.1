import React from "react";
import { useDispatch } from "react-redux";
import { deleteList, updateList } from "./../store/list/listSlice";
import { useState } from "react";

const List = ({ id, content, check, category }) => {
  const dispatch = useDispatch();
  const [updateValue, setUpdateValue] = useState("");
  const [finish, setFinish] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const toggleEdit = () => setIsEdit(!isEdit);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteList(id));
  };
  const onUpdate = (e) => {
    e.preventDefault();
    if (updateValue) {
      dispatch(updateList({ id, content: updateValue }));
      setUpdateValue("");
      toggleEdit();
    } else {
      window.alert("수정할값을 입력하세요");
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  return (
    <div>
      <div>
        <h3>{id}</h3>
        <p>{content}</p>
        <input type="checkbox" />
      </div>
      <div>
        <input
          type="text"
          value={updateValue}
          onChange={(e) => {
            setUpdateValue(e.target.value);
          }}
        />
        {isEdit ? (
          <>
            <select name="category">
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
            <button onClick={handleQuitEdit}>수정취소</button>
            <button onClick={onUpdate}>수정완료</button>
          </>
        ) : (
          <>
            <span>{category}</span>
            <button type="button" onClick={toggleEdit}>
              수정하기
            </button>
            <button type="button" onClick={onDelete}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
