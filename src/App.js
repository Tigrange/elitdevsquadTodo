import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  removeTodo,
  updateTodo,
  checkTodo,
} from "./redux/features/todo/todoSlice";
import styles from "./styles/todos.module.css";

function App() {
  let titleRef = useRef("");
  let descriptionRef = useRef("");
  let deadlineRef = useRef("");
  let dispatch = useDispatch();
  let todos = useSelector((state) => state.todo.todos);
  let [todosState, setTodosState] = useState(todos);

  let resetInputs = ()=>{
    titleRef.current = '';
    descriptionRef.current = '';
    deadlineRef.current = '';
  }

  let submit = (e) => {
    dispatch(
      addTodo({
        title: titleRef.current,
        desc: descriptionRef.current,
        deadline: deadlineRef.current,
        checked:false
      })
    );
    resetInputs();

  };
  let removeHandler = (t) => dispatch(removeTodo(t));
  let memoState = useMemo(() => setTodosState(todos), [todos]);
  console.log(todos , "todos")
  console.log(todosState, "todosState")
  return (
    <div>
      <form>
        <input
          placeholder="title"
          ref={titleRef}
          onChange={(e) => (titleRef.current = e.target.value)}
        />
        <input
          placeholder="description"
          ref={descriptionRef}
          onChange={(e) => (descriptionRef.current = e.target.value)}
        />
        <input
          placeholder="deadline"
          ref={deadlineRef}
          onChange={(e) => (deadlineRef.current = e.target.value)}
        />
        <button type={"button"} onClick={submit}>
          Submit
        </button>
      </form>
      <hr />
      <div>
        <label htmlFor='r-2'>not completed :</label>
        <input
          id="r-2"
          name="radio"
          type="radio"
          onClick={() =>
            setTodosState(todos.filter((item) => item.checked !== true))
          }
        />
      </div>
      <div>
        <label htmlFor="r-1" >completed :</label>
        <input
          id="r-1"
          name="radio"
          type="radio"
          onClick={() =>
            setTodosState(todos.filter((item) => item.checked === true))
          }
        />
      </div>
      <hr />
      <hr />
      <div>
        <h2>todos</h2>
        {todosState?.length !== 0 && (
          <div className={styles.todos}>
            {todosState?.map((item) => {
              return (
                <div
                  className={styles.todoItem}
                  key={item.title}
                  style={{ borderColor: item.checked && "green" }}
                >
                  <div>title: {item.title}</div>
                  <div>description: {item.description}</div>
                  <div>deadline: {item.deadline}</div>
                  <div>
                    <div
                      className={styles.remove}
                      onClick={() => removeHandler(item.title)}
                    >
                      Remove
                    </div>
                    <div>
                      <label htmlFor={`done-${item.title}`}>Done</label>
                      <input
                        type="checkbox"
                        id={`done-${item.title}`}
                        onChange={(e) => dispatch(checkTodo(item))}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
