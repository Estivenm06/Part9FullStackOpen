interface headerProp {
  header: string;
}
export const Header = ({ header }: headerProp) => {
  return <h2>{header}</h2>;
};
