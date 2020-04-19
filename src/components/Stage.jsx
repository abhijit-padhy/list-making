import React, {useState} from 'react'
import Task from './Task';

/**
 * Stage component is used to list down all task names 
 * @param {*} props 
 */
function Stage(props) {
  const [showNewCard, setShowNewCard] = useState(false); //used to show input bo for new task

  /**
   * Used to collect form data and pass to parent addTaskToStage method
   * to add the task into tasks list of given stage name.
   * @param {*} e 
   */
  function addTaskToStage(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    let task = form.get("taskname");
    console.log(task);
    if (task) {  
      e.target.taskname.value = "";
      setShowNewCard(false);
      props.addTaskToStage(props.stageKey, task);
    }
  }

  function onDragOver(ev) {
    ev.preventDefault();
  }

  function onDrop(ev, stage) {
    let fromStage = ev.dataTransfer.getData("stage");
    let id = ev.dataTransfer.getData("id");
    props.onDrop(stage, fromStage, id);
  }
  return (
    <div className="stage d-inline-block mx2"
      onDragOver={(e) => onDragOver(e, props.stageKey)}
      onDrop={(e) => onDrop(e, props.stageKey)}
    >
      <div className="tasks-container border1 rounded2 p2">
      <div className="stage-header mb2">{props.stage.title}</div>
      <div className="tasks">
        {
          props.stage.tasks.map((task, index) => (
            <Task key={index} task={task} stageKey={props.stageKey} index={index} />
          ))
        }
      </div>
      {
        !showNewCard ?
          <div>
            <button className="add-task w-100 my2 p2"
              onClick={() => setShowNewCard(true)}
            >+ Add Task</button>
          </div>
          :
          <div className="new-task my2">
            <form onSubmit={addTaskToStage} id="taskform" >
              <div className="form-group" style={{ maxWidth: "254px" }}>
                <textarea name="taskname" type="text" form="taskform"
                  className="w-100 border1 rounded2 p2 mb2"
                  placeholder="Enter a title for this card" >          
                </textarea>
              </div>
              <div className="form-group">
                <button className="create-task p2">Add</button>
              </div>
            </form>
          </div>
      }
      </div>
    </div>
  )
}

export default Stage
