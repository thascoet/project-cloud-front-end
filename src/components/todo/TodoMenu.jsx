import { useState } from "react";
import { maxSize, minSize, sizes } from "../../utils/constants";
import { getHexColor } from "../../utils/functions";


const TodoMenu = ({ todo, setTodo }) => {

    const [menuOpened, setMenuOpened] = useState(false);

    return (
        <div className="">
            <button
                className="todo-menu-button"
                onClick={() => setMenuOpened((prev) => !prev)}
            >
                {
                    menuOpened
                        ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-baseline-density-medium" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                }
            </button>
            {menuOpened && (
                <div className="todo-menu">
                    <div className="todo-menu-color">
                        <div
                            className="todo-menu-color-box"
                            style={{ backgroundColor: getHexColor("yellow") }}
                            onClick={() => setTodo({ ...todo, color: "yellow" })}
                        />
                        <div
                            className="todo-menu-color-box"
                            style={{ backgroundColor: getHexColor("pink") }}
                            onClick={() => setTodo({ ...todo, color: "pink" })}
                        />
                        <div
                            className="todo-menu-color-box"
                            style={{ backgroundColor: getHexColor("green") }}
                            onClick={() => setTodo({ ...todo, color: "green" })}
                        />
                        <div
                            className="todo-menu-color-box"
                            style={{ backgroundColor: getHexColor("blue") }}
                            onClick={() => setTodo({ ...todo, color: "blue" })}
                        />
                    </div>
                    <div className="todo-menu-size">
                        <div
                            className="todo-menu-size-box"
                            style={{borderColor: todo.size <= minSize ? "lightgray" : "gray"}}
                            onClick={() => setTodo({...todo, size: sizes[Math.max(0, sizes.findIndex((x) => x===todo.size)-1)]})}
                        >
                            <svg style={{stroke: todo.size <= minSize ? "lightgray" : "gray"}} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>
                        </div>
                        <p className="todo-menu-size-text">
                            {todo.size}
                        </p>
                        <div
                            className="todo-menu-size-box"
                            style={{borderColor: todo.size >= maxSize ? "lightgray" : "gray"}}
                            onClick={() => setTodo({...todo, size: sizes[Math.min(sizes.length-1, sizes.findIndex((x) => x===todo.size)+1)]})}
                        >
                            <svg style={{stroke: todo.size >= maxSize ? "lightgray" : "gray"}} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TodoMenu;