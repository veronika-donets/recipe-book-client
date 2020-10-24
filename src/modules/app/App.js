import React, { useEffect } from 'react';
import '../../shared/styles/index.scss';

import Header from "../../shared/components/Header/Header";
import Main from "../../shared/components/Main/Main";
import Footer from "../../shared/components/Footer/Footer";
import { runAllInterceptors } from "../../backend/interceptors/interceptors";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../../utils/localStorage";
import { setUserInfo } from "../auth/actions";

runAllInterceptors();

function App() {
    const dispatch = useDispatch();
    const authToken = getAuthToken();

    useEffect(() => {
        if (authToken) {
            dispatch(setUserInfo(authToken));
        }
    }, []);

  return (
      <div className="main-container">
        <Header />
        <Main />
        <Footer />
      </div>
  );
}

export default App;
