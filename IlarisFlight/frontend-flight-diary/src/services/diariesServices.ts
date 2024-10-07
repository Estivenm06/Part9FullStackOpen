import axios from "axios";
import { diaries} from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAll = async () => {
  const request = await axios.get<diaries[]>(baseUrl);
  return request.data;
};