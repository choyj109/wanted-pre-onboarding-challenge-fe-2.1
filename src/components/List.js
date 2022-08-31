import React from "react";
import { useDispatch } from "react-redux";
import { deleteList, updateList } from "./../store/list/listSlice";
import { useState } from "react";
import list from "./List.module.css";

const List = ({ id, content, category }) => {
  const dispatch = useDispatch();
  const [updateValue, setUpdateValue] = useState(content);
  const [isCheck, setisCheck] = useState(false);
  const [targetValue, setTargetValue] = useState(category);
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => setIsEdit(!isEdit);
  const toggleCheck = () => setisCheck(!isCheck);

  const onDelete = (e) => {
    e.preventDefault();
    dispatch(deleteList(id));
  };
  const onUpdate = (e) => {
    e.preventDefault();
    if (updateValue) {
      dispatch(updateList({ id, content: updateValue, category }));
      setUpdateValue(updateValue);
      toggleEdit();
    } else {
      window.alert("내용을 입력해주세요");
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setUpdateValue(content);
  };
  const onChange = (e) => {
    setTargetValue(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    toggleCheck();
  };
  return (
    <div className={list.List}>
      <div className={list.listBox}>
        {isEdit ? (
          <select
            required
            className={list.first}
            onChange={onChange}
            value={targetValue}
          >
            <option value="a">a</option>
            <option value="b">b</option>
            <option value="c">c</option>
          </select>
        ) : (
          <span className={list.first}>{targetValue}</span>
        )}
        {isCheck ? (
          <div className={list.content}>
            <h3 className={list.isCheck}>{content}</h3>
            <button onClick={onClick}>취소</button>
          </div>
        ) : (
          <div className={list.content}>
            <h3 className={list.finish}>{content}</h3>
            <button onClick={onClick}>완료</button>
          </div>
        )}
      </div>
      {isEdit ? (
        <div className={list.buttonBox}>
          <input
            type="text"
            value={updateValue}
            onChange={(e) => {
              setUpdateValue(e.target.value);
            }}
            maxLength={20}
          />

          <button onClick={handleQuitEdit}>수정취소</button>
          <button onClick={onUpdate}>수정완료</button>
        </div>
      ) : (
        <div className={list.buttonBox}>
          <button type="button" onClick={toggleEdit}>
            수정하기
          </button>
          <button type="button" onClick={onDelete}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
