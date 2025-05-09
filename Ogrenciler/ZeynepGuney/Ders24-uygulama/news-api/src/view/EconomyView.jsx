import React from "react";
import { useState, useEffect } from "react";
import {fetchData} from "../services/service";
import CardContainer from "../components/CardContainer/CardContainer";
const EconomyView = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const fetch = await fetchData("economy");
        setData(fetch);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return data.length === 0 ? (
    <p>Haberler yükleniyor...</p>
  ) : (
    <CardContainer news={data} />
  );
};

export default EconomyView;
