import React, { useCallback, useEffect, useState } from "react";
import AppContext from "./AppContext";
import data from "../assets/data.json";
import { LocalData } from "../const/common";

const AppProvider: React.FC<IProps> = (props) => {

  useEffect(() => {
    localStorage.setItem(LocalData.AllUsers, JSON.stringify(data));
  }, []);

  return (
    <AppContext.Provider
      value={{
        siteUrl: props.siteUrl,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export interface IProps {
  siteUrl: string;
}
