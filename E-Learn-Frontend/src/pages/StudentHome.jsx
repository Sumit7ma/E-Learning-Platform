import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CourseCard from "../components/CourseCard";

const dummyCourses = [
  {
    thumbnail: "https://i.ytimg.com/vi/7joYAXpL0Yc/maxresdefault.jpg",
    tag: "PREMIUM",
    language: "Hindi",
    title: "How to start a Business?",
    description: "Payroll, Excel & Labour Law Courses for career growth...",
    instructor: "Business Guru",
  },
  {
    thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
    tag: "PREMIUM",
    language: "Hindi",
    title: "Complete English Speaking Course",
    description: "Join our new 31-day power-packed batch.",
    instructor: "Seed Database",
  },
];

export default function StudentHome() {
  const user = {
    name: "Sumit",
    email: "sumit@example.com",
    role: "student",
  };

  return (
    <div className="d-flex">
      <Sidebar user={user} />
      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4 d-flex flex-wrap">
          {dummyCourses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
