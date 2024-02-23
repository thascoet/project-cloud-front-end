import { useEffect, useState } from "react";


const TodoGrab = ({todo, setTodo}) => {

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {

        const handleMouseMove = (event) => {
            if (isDragging) {
                const { clientX, clientY } = event;
                setTodo({
                    ...todo,
                    x: clientX - dragOffset.x,
                    y: clientY - dragOffset.y
                });
            }
        };

        const handleMouseUp = () => {
            if (isDragging) {
                document.body.classList.remove('disable-selection');
                setIsDragging(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

    }, [isDragging, dragOffset, setTodo, todo]);

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        const rect = event.target.getBoundingClientRect();
        document.body.classList.add('disable-selection');
        setIsDragging(true);
        setDragOffset({
            x: clientX - rect.left,
            y: clientY - rect.top
        });
    };

    return (
        <div
            className="todo-grab"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grip-vertical" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
        </div>
    );
};

export default TodoGrab;