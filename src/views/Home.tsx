import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home">
      <span>Home</span>
      <Link to="/test">Test</Link>
    </div>
  );
};
