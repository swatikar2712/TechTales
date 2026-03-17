import { Link, useLocation } from "react-router-dom";
import { courses } from "../data/courses";
import "./Courses.css";

function Courses() {
  const location = useLocation();
  const filter = location.state?.filter;

  const filteredCourses = courses.filter(course => {
    if (!filter) return true;
    if (filter === "AI World") return course.subject === "Artificial Intelligence";
    return true;
  });

  return (
    <div className="courses-page page-card">
      <div className="page-header">
        <h1>{filter ? `Explore ${filter}` : "Courses"} </h1>
        <p>Choose a course and start learning</p>
      </div>

      <div className="courses-list">
        {filteredCourses.map((course) => (
          <div key={course.class} className="course-block">
            <h2 className="course-block-title">{course.title}</h2>
            <div className="module-list">
              {course.modules.map((mod) => (
                <Link key={mod.id} to={`/lesson/${course.class}/${mod.id}`} className="module-link">
                  <div className="module-item">
                    <span className="module-name">{mod.title}</span>
                    <span className="module-arrow">&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;