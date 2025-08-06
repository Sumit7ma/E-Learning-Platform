import React, { useState } from "react";
import Sidebar from "../../components/instructor/Sidebar";
import Topbar from "../../components/instructor/Topbar";
import { useNavigate } from "react-router-dom";

export default function CreateCourseStep1() {
  const [selectedType, setSelectedType] = useState("COURSE");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/instructor/course/create/step2", { state: { type: selectedType } });
  };

  return (
    <div className="d-flex" style={{ backgroundColor: "#0b0f19", minHeight: "100vh" }}>
      <div style={{ width: "250px", position: "fixed", height: "100vh", zIndex: 1 }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Topbar />

        <div className="container py-5 text-light">
          <h4 className="mb-4">First, let's find out what type of course you're making.</h4>

          <div className="row">
            <div className="col-md-4">
              <div
                className={`card text-center p-4 mb-3 ${selectedType === "COURSE" ? "bg-primary text-white" : "bg-dark text-light"}`}
                onClick={() => setSelectedType("COURSE")}
                style={{ cursor: "pointer", border: "2px solid #3b82f6" }}
              >
                <i className="bi bi-journal-code fs-2 mb-2"></i>
                <h5>Course</h5>
                <p className="small mb-0">
                  Create rich learning experiences with video lectures, quizzes, coding exercises, etc.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className={`card text-center p-4 mb-3 ${selectedType === "PRACTICE_TEST" ? "bg-primary text-white" : "bg-dark text-light"}`}
                onClick={() => setSelectedType("PRACTICE_TEST")}
                style={{ cursor: "pointer", border: "2px solid #3b82f6" }}
              >
                <i className="bi bi-patch-question fs-2 mb-2"></i>
                <h5>Practice Test</h5>
                <p className="small mb-0">
                  Help students prepare for certification exams by providing practice questions.
                </p>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={() => navigate("/instructor/manage-courses")}>
              Back
            </button>
            <button className="btn btn-success" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
