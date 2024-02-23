import { getHexColor } from "../../utils/functions";
import TodoGrab from "./TodoGrab";
import TodoMenu from "./TodoMenu";

const Todo = ({ todo, setTodo }) => {

    return (
        <div
            className="todo"
            style={{
                backgroundColor: getHexColor(todo.color),
                top: `${todo.y}px`,
                left: `${todo.x}px`
            }}
        >
            <TodoGrab todo={todo} setTodo={setTodo} />
            <input
                className="todo-title"
                spellCheck={false}
                value={todo.title}
                onChange={({ target: { value: newTitle } }) => setTodo({ ...todo, title: newTitle })}
            />
            <TodoMenu todo={todo} setTodo={setTodo} />
            <textarea
                className="todo-description"
                style={{fontSize: `${todo.size}px`}}
                spellCheck={false}
                value={todo.description}
                onChange={({ target: { value: newDescription } }) => setTodo({ ...todo, description: newDescription })}
            />
        </div>
    )
};

export default Todo;