import millify from "millify";
import { Typography, Row, Col, Statistic, Card } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import Loader from "./Loader";
import { 
  DollarCircleOutlined, 
  BankOutlined, 
  FundOutlined,
  SwapOutlined, 
  GlobalOutlined 
} from "@ant-design/icons";

const Home = () => {
  const { data, isFetching, error } = useGetCryptosQuery(10);

  if (isFetching) return <Loader />;
  if (error) return <div>Error loading data</div>;
  if (!data?.data?.stats) return <div>No data available</div>;

  const globalStats = data.data.stats;

  const statsData = [
    {
      title: "Total Cryptocurrencies",
      value: globalStats.total || 0,
      icon: <BankOutlined style={{ fontSize: '24px', color: 'var(--primary)' }} />
    },
    {
      title: "Total Exchanges",
      value: globalStats.totalExchanges ? millify(globalStats.totalExchanges) : 0,
      icon: <SwapOutlined style={{ fontSize: '24px', color: 'var(--secondary)' }} />
    },
    {
      title: "Total Market Cap",
      value: globalStats.totalMarketCap ? millify(globalStats.totalMarketCap) : 0,
      icon: <DollarCircleOutlined style={{ fontSize: '24px', color: 'var(--primary)' }} />
    },
    {
      title: "Total 24h Volume",
      value: globalStats.total24hVolume ? millify(globalStats.total24hVolume) : 0,
      icon: <FundOutlined style={{ fontSize: '24px', color: 'var(--secondary)' }} />
    },
    {
      title: "Total Markets",
      value: globalStats.totalMarkets ? millify(globalStats.totalMarkets) : 0,
      icon: <GlobalOutlined style={{ fontSize: '24px', color: 'var(--primary)' }} />
    },
  ];

  return (
    <>
      <Title level={2} className="heading">
        Cryptocurrency Market Overview
      </Title>
      
      <Row gutter={[24, 24]}>
        {statsData.map((stat, i) => (
          <Col xs={24} sm={12} lg={8} xl={8} xxl={4} key={i}>
            <Card 
              style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderRadius: '12px',
                border: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {stat.icon}
                <p style={{ 
                  marginLeft: '10px', 
                  fontSize: '14px', 
                  color: 'var(--text-muted)',
                  margin: 0
                }}>
                  {stat.title}
                </p>
              </div>
              <p style={{ 
                fontSize: '24px', 
                fontWeight: '600', 
                margin: 0,
                color: 'var(--text-primary)'
              }}>
                {stat.value}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top Cryptocurrencies
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">View All</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
    </>
  );
};

export default Home;
