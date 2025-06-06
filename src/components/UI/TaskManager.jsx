import { useState, useRef, useEffect } from "react";
import { EditIcon, DeleteIcon } from "../../utils/icons";

const ActionBtns = ({ updateTask, deleteTask }) => {
  const iconClass =
    "w-8 h-8 rounded-full bg-gray-400 text-white flex justify-center items-center transition-colors duration-200 hover:bg-gray-600";

  return (
    <div className="flex gap-4">
      <EditIcon onClick={updateTask} className={iconClass} />
      <DeleteIcon onClick={deleteTask} className={iconClass} />
    </div>
  );
};

const TaskColumn = ({
  status,
  tasks,
  onDrop,
  onDragOver,
  onDrag,
  updateTask,
  deleteTask,
}) => {
  const bgColors = {
    TODO: "bg-purple-600",
    DOING: "bg-orange-600",
    DONE: "bg-green-600",
  };

  return (
    <div
      className="w-[25%] h-[400px]"
      data-status={status}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <h2
        className={`${bgColors[status]} capitalize px-4 py-2 text-center text-white text-lg font-bold`}
      >
        {status}
      </h2>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <div
            key={task.id}
            draggable
            onDrag={(e) => onDrag(e, task)}
            className="w-[90%] m-auto flex justify-between items-center h-[45px] border capitalize border-gray-300 rounded px-2.5 py-[10px] cursor-grab text-[20px] my-[10px] bg-gray-200"
          >
            {task.title}
            <ActionBtns
              updateTask={() => updateTask(task)}
              deleteTask={() => deleteTask(task)}
            />
          </div>
        ))}
    </div>
  );
};

const TaskManager = () => {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const TODO = "TODO";
  const DOING = "DOING";
  const DONE = "DONE";

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
      //Enter pressed
      if (updateItem) {
        //user is coming for an update
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
        };
        const copyTask = [...tasks];
        const filterList = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks((prevTask) => [...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
        };

        setTasks((prevTasks) => [...prevTasks, obj]);
      }
      setValue("");
    }
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  const handleDragNDrop = (status) => {
    let copyTask = [...tasks];
    copyTask = copyTask.map((item) => {
      if (dragTask.id === item.id) {
        item.status = status;
      }
      return item;
    });
    setTasks(copyTask);
    setDragTask(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute("data-status"); //TODO,DOING,DONE
    console.log("dropping ", status);
    if (status === TODO) {
      handleDragNDrop(TODO);
    } else if (status === DOING) {
      handleDragNDrop(DOING);
    } else if (status === DONE) {
      handleDragNDrop(DONE);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (item) => {
    let copyTask = [...tasks];
    copyTask = copyTask.filter((task) => task.id != item.id);
    setTasks(copyTask);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
    inputRef.current.focus();
  };

  // JSX
  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full">
      <h1 className="text-4xl font-bold text-violet-700">Task Manager</h1>
      <input
        onChange={handleChange}
        type="text"
        value={value}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="w-[250px] p-2 px-3 text-xl flex items-center justify-center border border-gray-200 outline-none rounded-md"
        placeholder="Enter Task..."
      />
      <div className="w-full flex justify-center items-center my-auto mx-0">
        {["TODO", "DOING", "DONE"].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            onDrop={handleOnDrop}
            onDragOver={onDragOver}
            onDrag={handleDrag}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
