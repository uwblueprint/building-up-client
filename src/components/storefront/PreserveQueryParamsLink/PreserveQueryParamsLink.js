import { Link, withRouter } from 'react-router-dom';

const PreserveQueryParamsLink = props => {
  var { search, to, ...otherProps } = props;

  return (
    <Link
      to={{
        pathname: props.to,
        search: props.location.search,
      }}
      {...otherProps}
    >
      {props.children}
    </Link>
  );
};

export default withRouter(PreserveQueryParamsLink);
