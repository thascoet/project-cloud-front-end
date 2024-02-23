import { useEffect } from "react";
import { useWebSocketState } from "../hooks/useWebSocketStateDeffer";
import { updateListElement } from "../utils/functions";
import AddTodo from "./AddTodo";
import Todo from "./todo/Todo";

const Board = () => {

    const port = process.env.WS_PORT || 3000;

    useEffect(() => console.log(port), []);
    
    const [todos, setTodos, {isLoading, isConnected}] = useWebSocketState(`ws://192.168.100.150:${port}`, 250);

    return (
        <div className="board">
            <AddTodo setTodos={setTodos}/>
            {
                isConnected && !isLoading &&
                todos.map((todo, index) => (
                    <Todo key={index} todo={todo} setTodo={updateListElement(setTodos, index)}/>
                ))
            }
        </div>
    );
};

export default Board;