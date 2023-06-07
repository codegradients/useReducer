import React, { useEffect, useReducer } from "react";
import "./style.css";

const getLocalStorage = () => {
  const list = localStorage.getItem("USE_REDUCER");
  return list ? JSON.parse(list) : [];
};

const initialState = {
  inputData: "",
  items: getLocalStorage(),
  isEdit: "",
  toggleButton: false,
};

const reducer = (state, action) => {
  const { inputData, items, isEdit, toggleButton } = state;
  if (action.type === "SET_INPUT") {
    return {
      ...state,
      inputData: action.payload,
    };
  } else if (action.type === "ADD_ITEM") {
    if (!inputData) {
      alert("Fill Input First");
      return state;
    } else if (inputData && toggleButton) {
      const updatedData = items.map((curElem) => {
        if (curElem.id === isEdit) {
          return { ...items, name: inputData };
        }
        return curElem;
      });
      return {
        ...state,
        items: updatedData,
        inputData: "",
        isEdit: "",
        toggleButton: false,
      };
    } else {
      const newData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      return {
        ...state,
        items: [...items, newData],
        inputData: "",
      };
    }
  } else if (action.type === "EDIT_ITEM") {
    const find_item = items.find((curElem) => {
      return curElem.id === action.payload;
    });
    return {
      ...state,
      inputData: find_item.name,
      isEdit: action.payload,
      toggleButton: true,
    };
  } else if (action.type === "DELETE_ITEM") {
    const filterItem = items.filter((curElem) => {
      return curElem.id !== action.payload;
    });
    return {
      ...state,
      items: filterItem,
    };
  } else if (action.type === "DELETE_ALL") {
    return {
      ...state,
      items: [],
    };
  }
  return state;
};

const Todo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputData, items, toggleButton } = state;

  const set_input = (e) => {
    dispatch({ type: "SET_INPUT", payload: e.target.value });
  };

  const add_item = () => {
    dispatch({ type: "ADD_ITEM" });
  };

  const edit_item = (index) => {
    dispatch({ type: "EDIT_ITEM", payload: index });
  };

  const delete_item = (index) => {
    dispatch({ type: "DELETE_ITEM", payload: index });
  };

  const delete_all = () => {
    dispatch({ type: "DELETE_ALL" });
  };

  useEffect(() => {
    localStorage.setItem("USE_REDUCER", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={set_input}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={add_item}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={add_item}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElement) => {
              const { id, name } = curElement;
              return (
                <div className="eachItem" key={id}>
                  <h3>{name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => edit_item(id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn "
                      onClick={() => delete_item(id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={delete_all}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
