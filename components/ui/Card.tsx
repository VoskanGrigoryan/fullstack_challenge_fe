import { Card } from "antd";
import { Col } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export const CCard = ({ amount }: any) => {
  return (
    <>
      {amount.map((item: any, key: number) => {
        return (
          <Col key={key} lg={{ span: 8 }} xs={{ span: 24 }}>
            <Card
              title={"Project N° " + key}
              bordered={false}
              extra={
                <a href="#">
                  <SettingOutlined />
                </a>
              }
              style={{ width: "300px", height: "240px", margin: 10 }}
              key={key}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Similique enim rerum, aliquid fuga temporibus magnam aliquam
                quasi accusamus eveniet dicta delectus nihil assumenda quaerat
                ex, totam, minima expedita iste incidunt?
              </p>
            </Card>
          </Col>
        );
      })}
    </>
  );
};
