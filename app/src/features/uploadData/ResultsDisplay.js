import React from 'react';
import moment from 'moment';

import {Alert, Button, Col, Divider, List, Row, Statistic, Table, Tabs, Tag,} from 'antd';
import {FacebookOutlined, LinkedinOutlined, TwitterOutlined,} from '@ant-design/icons';
import shortid from 'shortid';
import {getDate} from '../utils/dateUtils';

const { TabPane } = Tabs;

const columns = [
  {
    title: 'Lankyta vieta',
    dataIndex: ['location', 'name'],
    rowKey: () => shortid(),
  },
  {
    title: 'Adresas',
    dataIndex: ['location', 'address'],
    rowKey: () => shortid(),
  },
  {
    title: 'Laikas',
    dataIndex: ['visitEndTs'],
    render: (time) => moment.unix(time).format('YYYY-MM-DD HH:mm'),
    rowKey: () => shortid(),
  },
  {
    title: 'Rizikinga vieta',
    dataIndex: ['case', 'address'],
    render: (address) => address ? address : "-",
  },
  {
    title: 'Užsikrėtusio žmogaus lankymosi laikas',
    dataIndex: ['case', 'time'],
    render: (time) => time ? getDate(moment(time, 'MM/DD/YYYY h:mm')) : "-",
    rowKey: () => shortid(),
  },
  {
    title: 'Užsikrėtimo tikimybė',
    dataIndex: 'score',
    key: 'score',
    render: (score) => Number(score.toFixed(5) * 100).toFixed(2) + ' %',
    rowKey: () => shortid(),
  },
];

const visitedColumns = [
  {
    title: 'Lankyta vieta',
    dataIndex: ['location', 'name'],
    rowKey: () => shortid(),
  },
  {
    title: 'Adresas',
    dataIndex: ['location', 'address'],
    rowKey: () => shortid(),
  },
  {
    title: 'Laikas',
    dataIndex: ['visitStartTs'],
    render: (time) => moment.unix(time).format('YYYY-MM-DD HH:mm'),
    rowKey: () => shortid(),
  },
  {
    title: 'Praleistas laikas',
    dataIndex: ['timeSpent'],
    render: (hours) => `${hours.toFixed(2)}h`,
    rowKey: () => shortid(),
  },
  {
    title: 'Vietos aptikimo užtikrintumas',
    dataIndex: ['location', 'locationConfidence'],
    render: (locationConfidence) => locationConfidence.toFixed(2) + ' %',
    rowKey: () => shortid(),
  },
];

export function ResultDisplay(props) {
  console.log(props);

  const percentageAtHome =
    props.score.percentageAtHome != null
      ? props.score.percentageAtHome.toFixed(2)
      : 0;

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic
            title="Užsikrėtimo rizika"
            value={
              props.score != null
                ? (props.score.score * 100).toFixed(2)
                : props.score
            }
            precision={2}
            suffix="%"
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Laikas praleistas namie ar ne viešose vietose"
            value={
              props.score.percentageAtHome != null
                ? props.score.percentageAtHome
                : props.score.percentageAtHome
            }
            precision={2}
            suffix="%"
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Praleistas laikas viešose vietose"
            value={
              props.score.hoursSpentAtPublicPlaces != null
                ? props.score.hoursSpentAtPublicPlaces
                : props.hoursSpentAtPublicPlaces
            }
            precision={2}
            suffix="h"
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Aplankytų viešų vietų skaičius"
            value={
              props.score.visitedPublicPlacesCount != null
                ? props.score.visitedPublicPlacesCount
                : props.visitedPublicPlacesCount
            }
          />
        </Col>
      </Row>
      <Divider />
      <Alert
        style={{ marginTop: '10px', marginBottom: '10px' }}
        message="Įspėjimas"
        description="Šis skaičiavimas gali neatspindėti tikros situacijos. Jeigu turite įtarimų skambinkite į Karštąją koronaviruso liniją telefonu 1808."
        type="warning"
        showIcon
      />

      {percentageAtHome >= 60 && (
        <div>
          <p>
            Per pastarąsias dvi savaites, jūs praleidote net <strong>{percentageAtHome}% </strong> laiko
            namie. Pasidalinkite apie tai socialinuose tinkluose!{' '}
            <Tag color="green">#stayathome</Tag>{' '}
          </p>
          <Button
            href={
              'https://www.facebook.com/sharer/sharer.php?u=https://tracking-virus.netlify.com/'
            }
          >
            <FacebookOutlined />
          </Button>
          <Button
            style={{ marginLeft: '2px' }}
            href="https://twitter.com/home?status=https://tracking-virus.netlify.com/ Aš laiką leidžiu namie #stayathome"
          >
            <TwitterOutlined />
          </Button>
          <Button
            style={{ marginLeft: '2px' }}
            href="https://www.linkedin.com/shareArticle?mini=true&url=https://tracking-virus.netlify.com/&title=&summary=Aš laiką leidžiu namie #stayathome&source="
          >
            <LinkedinOutlined />
          </Button>
        </div>
      )}
      {percentageAtHome < 60 && (
        <p>
          Jūs praleidote tik <strong>{percentageAtHome}% </strong> laiko namie.
          Jei įmanoma laikykites karantino. Saugokite savę ir kitus.
        </p>
      )}

      <Tabs style={{ marginTop: '10px' }} type="card">
        <TabPane tab="Užsikrėtimo rizika" key="1">
          <p>
            Lentelėje yra pateikiamos TOP 3 vietos, kurios turėjo įtakos jūsų
            užsikrėtimo rizikos koficientui.
          </p>
          <Table
            pagination={{ defaultPageSize: 5, hideOnSinglePage: true }}
            bordered
            columns={columns}
            dataSource={props.score.places}
          />
        </TabPane>
        <TabPane tab="Lankytos viešos vietos" key="2">
          <p>
            Lentelėje yra pateikiamos jūsų lankytos viešos vietos, kurios turėjo
            įtakos praleisto laiko metrikose.
          </p>
          <Table
            pagination={{ defaultPageSizes: 5, hideOnSinglePage: true }}
            bordered
            columns={visitedColumns}
            dataSource={props.score.publicPlaces}
          />
        </TabPane>
        <TabPane tab="Rekomendacijos" key="3">
          <p>
            Žemiau yra pateikiamos bendros rekomendacijos norint sumažinti
            užsikrėtimo riziką.
          </p>
          <List
            size="small"
            bordered
            dataSource={[
              'Parkuose ir viešose vietose lankykitės ne didesnėse nei dviejų asmenų grupėse.',
              'Į prekybos paslaugų vietas eikite vienas.',
              'Viešose vietose dėvėkite apsaugos kaukes, respiratorius arba kitas nosį ir burną dengiančias priemones.',
              'Grįžus namo, iškarto su muilu ir šiltu vandeniu plaukite rankas bent 20 sekundžių.'
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
