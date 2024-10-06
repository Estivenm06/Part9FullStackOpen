interface ContentProps {
  name: string;
  exerciseCount: number;
}

const Header = ({ name }: { name: string }) => (<><h1>{name}</h1></>);

const Content = ({ courseParts }: { courseParts: Array<ContentProps> }) => (
  <>
    {courseParts.map((course, id) => (
      <p key={id}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
  </>
);

const Total = ({ totalExercises }: { totalExercises: number }) => (<><p>Number of exercises {totalExercises}</p></>);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total totalExercises={totalExercises} />
    </>
  );
};

export default App;
