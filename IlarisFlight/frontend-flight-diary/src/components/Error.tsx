import { ErrorMessage } from "../types";
export const Error = ({ error }: { error: ErrorMessage | null }) => {
  if (!error) {
    return null;
  }
  return (
    <>
      <p id="error">{error.response.data}</p>
    </>
  );
};
