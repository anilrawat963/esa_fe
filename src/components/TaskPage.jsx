import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/TaskPage.css";

function TaskPage() {
  const { taskId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const event = state?.event;

  const [taskDescription, setTaskDescription] = useState("");
  const [response, setResponse] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    const formData = {
      eventId: event?.id,
      taskId,
      taskDescription,
      response,
      fileName: file?.name || null,
    };

    console.log("Task Submitted:", formData);

    alert("Task submitted successfully!");
  };

  return (
    <div className="taskpage-container">

      {/* HEADER */}
      <div className="task-header">
        <button className="task-back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="taskpage-title">Task Details</h1>
      </div>

      {/* MAIN CARD */}
      <div className="task-card-pro">

        {/* EVENT + TASK IDs */}
        <div className="task-info-grid">
          <div className="task-info-box">
            <label>Event ID</label>
            <p>{event?.id}</p>
          </div>

          <div className="task-info-box">
            <label>Task ID</label>
            <p>{taskId}</p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="task-section-pro">
          <label>Task Description</label>
          <textarea
            className="task-textarea"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Write the task description..."
          />
        </div>

        {/* RESPONSE */}
        <div className="task-section-pro">
          <label>Response</label>
          <textarea
            className="task-textarea"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your response..."
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="task-section-pro">
          <label>Upload File</label>
          <input
            type="file"
            className="task-file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file && <p className="uploaded-file">📄 {file.name}</p>}
        </div>

        {/* SUBMIT */}
        <button className="task-submit-pro" onClick={handleSubmit}>
          Submit Task
        </button>

      </div>
    </div>
  );
}

export default TaskPage;
