import { Link, withRouter } from 'react-router-dom';

const PreserveQueryParamsLink = props => {
  var { search, to, ...rest } = props;

  return (
    <Link
      to={{
        pathname: props.to,
        search: props.location.search,
      }}
      {...rest}
    >
      {props.children}
    </Link>
  );
};

export default withRouter(PreserveQueryParamsLink);
