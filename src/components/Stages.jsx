import React, {useState} from 'react'
import Stage from './Stage';

function Stages() {
  const [stages, setStages] = useState({
    todo: {
      title: "TODO",
      tasks: []
    },
    inprogress: {
      title: "IN PROGRESS",
      tasks: []
    },
    done: {
      title: "DONE",
      tasks: []
    },
  });

  /**
   * Used to remove task from dragged stage and add into dropped stage
   * @param {String} stage 
   * @param {String} fromStage 
   * @param {Number} id 
   */
  function onDrop(stage, fromStage, id) {
    console.log(stage, fromStage, id);
    let _stages = {...stages};
    let fromStageTasks = [..._stages[fromStage].tasks];
    let toStageTasks = [..._stages[stage].tasks];
    
    toStageTasks.push(fromStageTasks.splice(id, 1)[0]);
    _stages[fromStage]["tasks"] = fromStageTasks;
    _stages[stage]["tasks"] = toStageTasks;
    setStages({..._stages});
  }
  
  /**
   * Used to add new task to tasks list of given stage 
   * @param {String} stage 
   * @param {String} task 
   */
  function addTaskToStage(stage, task) {
    let _stages = {...stages};
    let toStageTasks = [..._stages[stage].tasks];
    let _task = {};
    _task["name"] = task;
    toStageTasks.push(_task);
    _stages[stage]["tasks"] = toStageTasks;
    setStages({..._stages});
  }

  return (
    <div className="stages p1">
      <div className="stage-container">
      {
        Object.keys(stages).map((stage, index) => (
          <Stage key={stage} stage={stages[stage]} onDrop={onDrop} stageKey={stage} addTaskToStage={addTaskToStage} />
        ))
      }
    </div>
    </div>
  )
}

export default Stages
