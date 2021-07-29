import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/layouts/MyNavbar';

const Dashboard = () => {
  return (
    <Container fluid>
      <MyNavbar />
      <div>
        <Link to="/list-questions">List Questions</Link>
        <br />
        {/* <Link to="/socket">Socket</Link> */}
        <br />
        <Link to="/room">Room</Link>
      </div>
    </Container>
  );
};

export default Dashboard;
