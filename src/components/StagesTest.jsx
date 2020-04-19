import React, {useState} from 'react'

/**
 * Obsolete component.
 */
function Stages() {
  const [stages, setStages] = useState({
    todo: {
      title: "TODO",
      tasks: [
        {
          name: "poc design",
        },
        {
          name: "Gather Requirements",
        },
      ]
    },
    inprogress: {
      title: "IN PROGRESS",
      tasks: [
        {
          name: "dashboard design",
        },
        {
          name: "Gather dashboard Requirements",
        },
      ]
    },
    done: {
      title: "DONE",
      tasks: [
        {
          name: "complete poc design",
        },
        {
          name: "Gather complete Requirements",
        },
      ]
    },
  });
  const [showNewCard, setShowNewCard] = useState(false);
  function addTaskToStage(e) {
    e.preventDefault();
    let form = new FormData(e.target);
    console.log(form.get("taskname"));
  }

  function onDragStart(ev, stage, taskId) {
    console.log(taskId);
    ev.dataTransfer.setData("stage", stage);
    ev.dataTransfer.setData("id", taskId);
  }

  function onDragOver(ev) {
    ev.preventDefault();
  }

  function onDrop(ev, stage) {
    let fromStage = ev.dataTransfer.getData("stage");
    let id = ev.dataTransfer.getData("id");
    console.log(stage, fromStage, id);
    let _stages = {...stages};
    let fromStageTasks = [..._stages[fromStage].tasks];
    let toStageTasks = [..._stages[stage].tasks];
    console.log("before: ",_stages, fromStageTasks, toStageTasks);
    
    toStageTasks.push(fromStageTasks.splice(id, 1)[0]);
    _stages[fromStage]["tasks"] = fromStageTasks;
    _stages[stage]["tasks"] = toStageTasks;
    console.log("after: ",_stages);
    setStages({..._stages});
  }
  return (
    <div className="stages p1">
      {
        Object.keys(stages).map((stage, index) => (
      <div key={stage} className="stage d-inline-block p2 border1 rounded2 my2"
        onDragOver={(e) => onDragOver(e, stage)}
        onDrop={(e) => onDrop(e, stage)}
      >
        <div className="stage-header mb2">{stages[stage].title}</div>
        <div className="tasks">
          {
            stages[stage].tasks.map((task, index) => (
              <div key={index} className="task p2 border1 rounded2 mb2" draggable
                onDragStart={(e) => onDragStart(e, stage, index)}
              >
                <div className="title">{task.name}</div>
              </div>
            ))
          }
        </div>
        {
          !showNewCard ?
          <button className="add-task w-100 p2"
            onClick={() => setShowNewCard(true)}
          >+ Add Task</button> :
          <div className="new-task">
            <form onSubmit={addTaskToStage}>
              <div className="form-group" style={{maxWidth: "254px"}}>
                <textarea name="taskname" className="w-100 border1 rounded2 p2 mb2"></textarea>
              </div>
              <div className="form-group">
                <button className="create-task p2">Add</button>
              </div>
            </form>
          </div>
        }
      </div>
      ))
    }
    </div>
  )
}

export default Stages
