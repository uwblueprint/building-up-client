import { Link, withRouter } from 'react-router-dom';

const PreserveQueryParamsLink = props => {
  const { location, to, className, children } = props;

  return (
    <Link
      to={{
        pathname: to,
        search: location.search,
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default withRouter(PreserveQueryParamsLink);
