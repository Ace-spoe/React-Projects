import React, { useState , useReducer } from 'react'
import "./style.css"
const initialState = {
    tasks: [] ,
    taskCount : 0
};

// const action = {
//     type : '',
//     payload : {
//         ID : 0,
//         title : ''
//     } 
//}

const taskReducer = (state , action) => {
    switch (action.type) {
        case "ADD_TASK":
            return  {
                ...state,
                tasks : [
                    ...state.tasks ,
                    {
                        ID : action.payload.ID,
                        title: action.payload.title,
                        isCompleted: false
                    }
                 ],
                taskCount : state.taskCount + 1  }
        case "TOGGLE_TASK": 
            return {
                   ...state, 
                  tasks :     
                    state.tasks.map((task)=> {
                        if(task.ID === action.payload.ID){
                            return {
                                ...task,
                                isCompleted: !task.isCompleted
                            }
                            
                        }
                        return task;
                    }) 
            }

        case "DELETE_TASK": 
             return {
                ...state,
                taskCount : state.taskCount - 1,
                tasks : 
                    state.tasks.filter((task)=> 
                        (task.ID != action.payload.ID))
        }

        case "CLEAR_COMPLETED":
            const active = state.tasks.filter((task) => (task.isCompleted != true));
            return {
                ...state ,
                taskCount : active.length,
                tasks : active
            }
        default:
            return state;
    }
}


const TaskManager = () => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const [inputText ,setInputText] = useState('');

    function handleAdd(){
        if (!inputText.trim()) return;

        dispatch({
            type: "ADD_TASK",
            payload: {
                ID : Date.now(),
                title : inputText
            }
        });
        
        setInputText("");
    };

    return (
    <div className="task-manager">
      <h2 className="title">Task Sprint Manager</h2>
      <p className="task-count">
        Items in list: <strong>{state.taskCount}</strong>
      </p>
      <div className="input-section">
        <input
          className="task-input"
          // Current input value
          value={inputText}
          // Update state whenever user types
          onChange={(e) => setInputText(e.target.value)}

          placeholder="New task..."
        />

        <button
          className="add-btn"

          // Add task when clicked
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className="task-list">

        {/* Loop through all tasks */}
        {state.tasks.map((task) => (

          <li
            key={task.ID}
            className="task-item"
          >

            <input
              type="checkbox"

              // Checkbox reflects completion state
              checked={task.isCompleted}

              // Dispatch toggle action
              onChange={() =>
                dispatch({
                  type: "TOGGLE_TASK",
                  payload: { ID: task.ID }
                })
              }
            />

            <span
              className={
                task.isCompleted
                  ? "task-text completed"
                  : "task-text"
              }
            >
              {task.title}
            </span>

            <button
              className="delete-btn"

              // Dispatch delete action
              onClick={() =>
                dispatch({
                  type: "DELETE_TASK",
                  payload: { ID: task.ID }
                })
              }
            >
              Delete
            </button>

          </li>
        ))}
      </ul>

      {/* Show button only if tasks exist */}
      {state.tasks.length > 0 && (

        <button
          className="clear-btn"

          // Dispatch clear completed action
          onClick={() =>
            dispatch({
              type: "CLEAR_COMPLETED"
            })
          }
        >
          Clear Completed Tasks
        </button>

      )}
    </div>
  );
}

export default TaskManager;




//Gemini

// import React, { useReducer, useState } from "react";
// import "./TaskSprintManager.css";

// /**
//  * Reducer Function
//  * Handles all state updates in one place.
//  * We always return a NEW state object (immutability).
//  */
// const taskReducer = (state, action) => {
//   switch (action.type) {

//     // Add a new task
//     case "ADD_TASK":
//       return {
//         ...state,

//         // Create a NEW tasks array with the new task added
//         tasks: [
//           ...state.tasks,
//           {
//             ID: action.payload.ID,
//             title: action.payload.title,
//             isCompleted: false
//           }
//         ],

//         // Increase task count
//         taskCount: state.taskCount + 1
//       };

//     // Toggle completed state
//     case "TOGGLE_TASK":
//       return {
//         ...state,

//         // map() creates a NEW array
//         // Replace only the matching task
//         tasks: state.tasks.map((task) =>
//           task.ID === action.payload.ID

//             // Create a NEW object with updated completion status
//             ? {
//                 ...task,
//                 isCompleted: !task.isCompleted
//               }

//             // Keep all other tasks unchanged
//             : task
//         )
//       };

//     // Delete a task
//     case "DELETE_TASK":

//       // filter() returns a NEW array without the deleted task
//       const remainingAfterDelete = state.tasks.filter(
//         (task) => task.ID !== action.payload.ID
//       );

//       return {
//         ...state,

//         // Update tasks list
//         tasks: remainingAfterDelete,

//         // Keep task count synchronized
//         taskCount: remainingAfterDelete.length
//       };

//     // Remove all completed tasks
//     case "CLEAR_COMPLETED":

//       // Keep only incomplete tasks
//       const activeTasks = state.tasks.filter(
//         (task) => !task.isCompleted
//       );

//       return {
//         ...state,
//         tasks: activeTasks,

//         // Update task count
//         taskCount: activeTasks.length
//       };

//     // Default fallback
//     default:
//       return state;
//   }
// };

// /**
//  * Initial Application State
//  */
// const initialState = {
//   tasks: [],
//   taskCount: 0
// };

// export default function TaskSprintManager() {

//   // useReducer manages complex state logic
//   const [state, dispatch] = useReducer(taskReducer, initialState);

//   // useState stores the current input text
//   const [inputText, setInputText] = useState("");

//   /**
//    * Handles adding a new task
//    */
//   const handleAdd = () => {

//     // Prevent empty tasks
//     if (!inputText.trim()) return;

//     // Dispatch an action object to the reducer
//     dispatch({
//       type: "ADD_TASK",

//       // payload carries task data
//       payload: {
//         ID: Date.now(),
//         title: inputText
//       }
//     });

//     // Clear input after adding task
//     setInputText("");
//   };

//   return (
//     <div className="task-manager">

//       <h2 className="title">Task Sprint Manager</h2>

//       <p className="task-count">
//         Items in list: <strong>{state.taskCount}</strong>
//       </p>

//       <div className="input-section">

//         <input
//           className="task-input"

//           // Current input value
//           value={inputText}

//           // Update state whenever user types
//           onChange={(e) => setInputText(e.target.value)}

//           placeholder="New task..."
//         />

//         <button
//           className="add-btn"

//           // Add task when clicked
//           onClick={handleAdd}
//         >
//           Add
//         </button>
//       </div>

//       <ul className="task-list">

//         {/* Loop through all tasks */}
//         {state.tasks.map((task) => (

//           <li
//             key={task.ID}
//             className="task-item"
//           >

//             <input
//               type="checkbox"

//               // Checkbox reflects completion state
//               checked={task.isCompleted}

//               // Dispatch toggle action
//               onChange={() =>
//                 dispatch({
//                   type: "TOGGLE_TASK",
//                   payload: { ID: task.ID }
//                 })
//               }
//             />

//             <span
//               className={
//                 task.isCompleted
//                   ? "task-text completed"
//                   : "task-text"
//               }
//             >
//               {task.title}
//             </span>

//             <button
//               className="delete-btn"

//               // Dispatch delete action
//               onClick={() =>
//                 dispatch({
//                   type: "DELETE_TASK",
//                   payload: { ID: task.ID }
//                 })
//               }
//             >
//               Delete
//             </button>

//           </li>
//         ))}
//       </ul>

//       {/* Show button only if tasks exist */}
//       {state.tasks.length > 0 && (

//         <button
//           className="clear-btn"

//           // Dispatch clear completed action
//           onClick={() =>
//             dispatch({
//               type: "CLEAR_COMPLETED"
//             })
//           }
//         >
//           Clear Completed Tasks
//         </button>

//       )}
//     </div>
//   );
// }
