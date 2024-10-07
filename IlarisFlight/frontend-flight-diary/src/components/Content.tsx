import { diaries } from "../types";

export const Content = ({ content }: { content: Array<diaries> }) => {
  return (
    <>
      {content.map((diary, id) => (
        <div key={id}>
          <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
        </div>
      ))}
    </>
  );
};
