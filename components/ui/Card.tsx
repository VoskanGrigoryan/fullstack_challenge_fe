import { Card } from "antd";
import { Col } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export const CCard = ({ projects }: any) => {
  const router = useRouter();

  return (
    <>
      {projects?.map((item: any, key: number) => {
        return (
          <Col key={key} lg={{ span: 7 }} md={{ span: 12 }} xs={{ span: 24 }}>
            <Card
              onClick={() => {
                router.push(`/project/${item.id}`);
              }}
              title={item.title}
              bordered={false}
              extra={
                <a href="#">
                  <SettingOutlined />
                </a>
              }
              style={{
                width: "300px",
                maxHeight: "400px",
                margin: 10,
                cursor: "pointer",
              }}
              key={key}
            >
              <p>{item.description}</p>
            </Card>
          </Col>
        );
      })}
    </>
  );
};
