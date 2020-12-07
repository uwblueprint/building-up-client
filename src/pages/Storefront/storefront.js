import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/Storefront/Header";
import Banner from "../../components/Storefront/Banner";
import ItemListing from "../../components/Storefront/ItemListing";
import { useQuery, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useShopify } from "../../hooks/useShopify";
import { actions as teamActions } from "../../data/reducers/team";

const GET_TEAM_INFO = gql`
  query getTeam($id: Int!) {
    getTeam(id: $id) {
      name
      organization
      id
    }
  }
`;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  }
}));

const toques = [];
for (let i = 0; i < 7; ++i) {
  toques.push({ title: "Example of Toque", variants: [{ price: 15.0 }] });
}

const StoreFront = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, fetchProduct } = useShopify();

  useEffect(() => {
    console.log(props);
  }, [props]);

  const id = Number(props.match.params.id);
  console.log("This is the id", id);
  const { loading, error, data } = useQuery(GET_TEAM_INFO, {
    variables: { id }
  });

  useEffect(() => {
    if (data) {
      dispatch(teamActions.setTeam(data.getTeam));
    }
  }, [data, dispatch]);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log("This is the team data: ", data);
  console.log("This is the error", error);

  const handleItemClick = productId => {
    fetchProduct(productId).then(res => {
      history.push(`/${id}/store/${res.id}`);
    });
  };

  return (
    <div className={classes.root}>
      <Header teamId={id} />
      <Banner />
      <ItemListing
        sectionTitle="PLACEHOLDER TOQUES"
        products={toques}
        handleItemClick={handleItemClick}
      />
      <ItemListing
        sectionTitle="ACTUAL PRODUCTS"
        products={products}
        handleItemClick={handleItemClick}
      />
    </div>
  );
};

export default StoreFront;
