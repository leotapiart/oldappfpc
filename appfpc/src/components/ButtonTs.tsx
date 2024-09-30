interface Props {
  text: string;
  bgcolor?: string;
}

const ButtonTs = (props: Props) => {
  const { text, bgcolor } = props;
  return <button style={{ backgroundColor: bgcolor }}>{text}</button>;
};
export default ButtonTs;
