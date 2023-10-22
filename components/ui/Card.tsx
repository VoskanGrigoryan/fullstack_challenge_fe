import { Card } from "antd";

const CustomCard = ({
  title,
  body,
  extra,
  actions,
}: {
  title: string;
  body: string;
  extra: any;
  actions: any;
}) => {
  //This component wont be used because it's basically the same
  //as making a new Card from antd every time.
  return (
    <Card
      style={{ width: "auto" }}
      title={title}
      extra={extra}
      actions={actions}
    >
      {body}
    </Card>
  );
};

//Actions es un array
export default CustomCard;
