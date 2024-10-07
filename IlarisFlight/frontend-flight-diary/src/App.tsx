import { useEffect, useState } from "react";
import { diaries, Visibility, Weather } from "./types";
import { getAll } from "./services/diariesServices";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import axios from "axios";
import { Error } from "./components/Error";
import { ErrorMessage } from "./types";

function App() {
  const [diaries, setDiaries] = useState<diaries[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    getAll().then((response) => {
      setDiaries(response);
    });
  }, []);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const diaryToAdd = {
        date,
        comment,
        weather,
        visibility,
      };
      axios
        .post<diaries>("http://localhost:3000/api/diaries", diaryToAdd)
        .then((response) => {
          setDiaries(diaries.concat(response.data));
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setTimeout(() => setError(null), 5000);
        });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <Error error={error} />
      <form onSubmit={submit}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility: great
          <input
            type="radio"
            value={Visibility.Great}
            name="visibility"
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input
            type="radio"
            value={Visibility.Good}
            name="visibility"
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
          <input
            type="radio"
            value={Visibility.Ok}
            name="visibility"
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor
          <input
            type="radio"
            value={Visibility.Poor}
            name="visibility"
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </div>
        <div>
          weather: Cloud
          <input
            type="radio"
            value={Weather.Cloud}
            name="weather"
            onChange={() => setWeather(Weather.Cloud)}
          />
          Rainy
          <input
            type="radio"
            value={Weather.Rainy}
            name="weather"
            onChange={() => setWeather(Weather.Rainy)}
          />
          Stormy
          <input
            type="radio"
            value={Weather.Stormy}
            name="weather"
            onChange={() => setWeather(Weather.Stormy)}
          />
          Sunny
          <input
            type="radio"
            value={Weather.Sunny}
            name="weather"
            onChange={() => setWeather(Weather.Sunny)}
          />
          Windy
          <input
            type="radio"
            value={Weather.Windy}
            name="weather"
            onChange={() => setWeather(Weather.Windy)}
          />
        </div>
        <div>
          comment:{" "}
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <Header header="Diary entries" />
      <Content content={diaries} />
    </>
  );
}

export default App;
