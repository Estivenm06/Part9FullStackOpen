interface CoursePartsBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartsBaseDescription extends CoursePartsBase {
  description: string;
}

interface CoursePartsBasic extends CoursePartsBaseDescription {
  kind: "basic";
}

interface CoursePartsGroup extends CoursePartsBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartsBackground extends CoursePartsBaseDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartsRequeriments extends CoursePartsBaseDescription {
  requirements: Array<string>;
  kind: "special";
}

type CoursePart =
  | CoursePartsBasic
  | CoursePartsGroup
  | CoursePartsBackground
  | CoursePartsRequeriments;

const Header = ({ name }: { name: string }) => (
  <>
    <h1>{name}</h1>
  </>
);

const Part = ({ courseParts }: { courseParts: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled descriminated union member ${JSON.stringify(value)}`
    );
  };

  switch (courseParts.kind) {
    case "basic":
      return (
        <>
          <strong>
            {courseParts.name} {courseParts.exerciseCount}
          </strong>
          <br />
          {courseParts.description}
        </>
      );
    case "group":
      return (
        <>
          <strong>
            {courseParts.name} {courseParts.exerciseCount}
          </strong>
          <br />
          project exercises {courseParts.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          <strong>
            {courseParts.name} {courseParts.exerciseCount}
          </strong>
          <br />
          {courseParts.description}
          <br />
          submit to {courseParts.backgroundMaterial}
        </>
      );
    case "special":
      return (
        <>
          <strong>
            {courseParts.name} {courseParts.exerciseCount}
          </strong>
          <br />
          {courseParts.description}
          <br />
          required skills:{" "}
          {courseParts.requirements.map((requirements, id) => (
            <span key={id}>{requirements}, </span>
          ))}
        </>
      );
    default:
      assertNever(courseParts);
  }
};

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <>
      {courseParts.map((course, id) => (
        <p key={id}>
          <Part courseParts={course} />
        </p>
      ))}
    </>
  );
};

const Total = ({ totalExercises }: { totalExercises: number }) => (
  <>
    <p>Number of exercises {totalExercises}</p>
  </>
);

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
