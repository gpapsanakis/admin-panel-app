import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import mq from "../styling/mediaQueries";
import AlignItemsList from "../components/ListItems/ListItems";
import { fetchUsers, updateUser } from "../config/api";
import Loader from "../components/Loader/Loader";
import Form from "../components/Form/Form";

const Content = styled("div")(
  {
    textAlign: "center",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "flex",
  },
  mq({
    margin: [0, "70px 100px 100px 100px"],
    height: ["100vh", "80vh"],
  })
);

const ContentUsers = styled("div")(
  {
    textAlign: "center",
    backgroundColor: "white",
    overflow: "auto",
  },
  mq({
    height: ["100vh", "80vh"],
    width: ["20%", "50%"],
  })
);

const ContentForm = styled("div")(
  {
    textAlign: "center",
    backgroundColor: "white",
    overflow: "auto",
  },
  mq({
    height: ["100vh", "80vh"],
    width: ["80%", "50%"],
  })
);

const Header = styled("p")(
  mq({
    width: ["80%", "50%"],
    marginTop: [400, 200],
    fontSize: [20, 30],
  })
);

const DashboardLayout = () => {
  const [userData, setUserData] = useState();
  const [formUserData, setFormUserData] = useState();
  const [loading, setLoading] = useState(false);

  const fetchUsersData = async () => {
    try {
      setLoading(true);
      const result = await fetchUsers();
      setLoading(false);
      const resultSet = result.data;
      setUserData(resultSet);
    } catch (error) {
      console.error("fetchUsers", error);
    }
  };

  const fetchFormUserData = async (activeUser) => {
    try {
      const result = await userData.find((item) => item.id === activeUser);
      setFormUserData(result);
    } catch (error) {
      console.error("fetchSpecificUser", error);
    }
  };

  const updateUserData = async (id, data) => {
    try {
      setLoading(true);
      const result = await updateUser(id, data);
      setLoading(false);
      const resultSet = result.data;
      setFormUserData(resultSet);
      const userDataIndex = userData.findIndex((item) => item.id === id);
      const userDataArray = userData;
      userDataArray[userDataIndex] = resultSet;
      setUserData(userDataArray);
    } catch (error) {
      console.error("updateUser", error);
    }
  };

  useEffect(() => {
    !userData && fetchUsersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectUser = (id) => {
    setFormUserData();
    fetchFormUserData(id);
  };

  return (
    <>
      <Content data-testid="content-section">
        {userData && (
          <ContentUsers>
            <AlignItemsList userData={userData} selectUser={selectUser} />
          </ContentUsers>
        )}
        {formUserData ? (
          <ContentForm>
            <Form formUserData={formUserData} updateUserData={updateUserData} />
          </ContentForm>
        ) : (
          userData && <Header>Select a user to edit</Header>
        )}
      </Content>
      <Loader open={loading} />
    </>
  );
};

export default DashboardLayout;
