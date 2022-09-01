import React from "react";
import { useDispatch } from "react-redux";
import { deleteList, updateList } from "./../store/list/listSlice";
import { useState } from "react";
import list from "./List.module.css";

const List = ({ id, content, category, hashtags }) => {
  const dispatch = useDispatch();
  const [updateValue, setUpdateValue] = useState(content);
  const [isCheck, setisCheck] = useState(false);
  const [targetValue, setTargetValue] = useState(category);
  const [isEdit, setIsEdit] = useState(false);
  const [hashValue, setHashValue] = useState(hashtags);
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  const toggleCheck = () => setisCheck(!isCheck);

  const onDelete = (e) => {
    e.preventDefault();
    if (window.confirm("삭제하겠습니까?")) {
      dispatch(deleteList(id));
    }
  };
  const onUpdate = (e) => {
    e.preventDefault();
    if (updateValue || targetValue || hashValue) {
      dispatch(
        updateList({
          id,
          content: updateValue,
          category: targetValue,
          hashtags: hashValue,
        })
      );
      setUpdateValue(updateValue);
      setHashValue(hashValue);
      toggleEdit();
    } else {
      window.alert("내용을 입력해주세요");
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setUpdateValue(content);
    setHashValue(hashValue);
  };
  const onChange = (e) => {
    e.preventDefault();
    setTargetValue(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    toggleCheck();
  };
  return (
    <div className={list.List}>
      {isEdit ? (
        <div className={list.listBox}>
          <div className={list.category}>
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
            <input
              type="text"
              value={hashValue}
              onChange={(e) => {
                setHashValue(
                  e.target.value
                    .split(",")
                    .map((word) => (word.startsWith("#") ? word : `#${word}`))
                );
              }}
              placeholder="해시태그"
            />
          </div>
          <div className={list.input}>
            <input
              type="text"
              value={updateValue}
              onChange={(e) => {
                setUpdateValue(e.target.value);
              }}
              maxLength={20}
            />
          </div>
          <div className={list.modify}>
            <button onClick={handleQuitEdit}>수정취소</button>
            <button onClick={onUpdate}>수정완료</button>
          </div>
        </div>
      ) : (
        <div className={list.listBox}>
          <div className={list.category}>
            <span>{targetValue}</span>
            <span>{hashValue}</span>
          </div>
          <div className={list.list}>
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
          <div className={list.modify}>
            <button type="button" onClick={toggleEdit}>
              수정하기
            </button>
            <button type="button" onClick={onDelete}>
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
