import React from 'react'

/**
 * Component used render task name
 * @param {*} param0 
 */
function Task({stageKey, index, task}) {
  /**
   * Used to store event data using datatransfer method
   * which will be used in onDrop method
   * @param {Object} ev 
   * @param {String} stage 
   * @param {Number} taskId 
   */
  function onDragStart(ev, stage, taskId) {
    console.log(stage, taskId);
    ev.dataTransfer.setData("stage", stage);
    ev.dataTransfer.setData("id", taskId);
  }

  return (
    <div className="task p2 border1 rounded2 mb2" draggable
      onDragStart={(e) => onDragStart(e, stageKey, index)}
    >
      <div className="title">{task.name}</div>
    </div>
  )
}

export default Task
