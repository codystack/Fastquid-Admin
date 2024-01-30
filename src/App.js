import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

import { useDispatch, useSelector } from "react-redux";

// Images
import brand from "assets/images/fast-logos/logolight.svg";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import useProfile from "hooks/profile";
import { setAuth, setProfile } from "./redux/slices/profile";
import useLoan from "hooks/loans";
import { setLoans, setRecentLoans, setLoanRequests } from "redux/slices/loans";
import { setTransaction } from "redux/slices/transactions";
import { setSupport } from "redux/slices/support";
import { setUsers } from "redux/slices/user";
import { setAdmins } from "redux/slices/admin";
import { Backdrop, CircularProgress } from "@mui/material";
import useTransaction from "hooks/transactions";
import useSupport from "hooks/support";
import useUsers from "hooks/users";
import useAdmins from "hooks/admins";
import useCompany from "hooks/useCompany";
import { setCompanies } from "redux/slices/company";
import useSettings from "hooks/useSettings";
import { setSettings } from "redux/slices/settings";
import useRequest from "hooks/useRequest";
import useCard from "hooks/useCard";
import { setDebitCards } from "redux/slices/cards";
import useLoanUsecase from "hooks/useLoanUsecase";
import { setApprovedLoans } from "redux/slices/loans";
import { setPendingLoans } from "redux/slices/loans";
import { setSettledLoans } from "redux/slices/loans";
import { setDeclinedLoans } from "redux/slices/loans";
import { setDisbursedLoans } from "redux/slices/loans";
import useSettledLoan from "hooks/useSettledLoans";
import useCreditedLoan from "hooks/useCreditedLoans";
import { setAlltimeCreditedLoans } from "redux/slices/loans";
import { setAlltimeSettledLoans } from "redux/slices/loans";

export default function App () {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const { data, mutate } = useProfile();
  const { data: requestData } = useRequest(1);
  const { data: cardData } = useCard();
  const { data: companyData, mutateCompany } = useCompany(1);
  const { data: settingsData, mutateSettings } = useSettings();
  const { data: loanData, mutate: loanMutate } = useLoan(1);
  const { data: allSettledLoanData } = useSettledLoan(1);
  const { data: allCreditedLoanData } = useCreditedLoan(1);
  const { data: approvedLoanData } = useLoanUsecase(1, "approved");
  const { data: pendingLoanData } = useLoanUsecase(1, "pending");
  const { data: disbursedLoanData } = useLoanUsecase(1, "credited");
  const { data: settledLoanData } = useLoanUsecase(1, "settled");
  const { data: deniedLoanData } = useLoanUsecase(1, "denied");
  const { data: transactionData, mutate: transactionMutate } = useTransaction(1);
  const { data: supportData, mutate: supportMutate } = useSupport(1);
  const { data: usersData, mutate: usersMutate } = useUsers(1);
  const { data: adminsData, mutate: adminsMutate } = useAdmins();

  const dispatcher = useDispatch();
  const { profileData, isAuth } = useSelector(state => state.profile);
  const { isLoading } = useSelector(state => state.loading);

  // const { isAuth, profile } = useSelector((state) => state.auth);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    if (data) {
      dispatcher(setAuth(true));
      dispatcher(setProfile(data));
    }

    if (settingsData) {
      dispatcher(setSettings(settingsData?.docs[0]));
    }

    if (cardData) {
      dispatcher(setDebitCards(cardData));
    }
  }, [data, settingsData, cardData]);

  useEffect(() => {
    if (transactionData) {
      dispatcher(setTransaction(transactionData));
    }
    if (supportData) {
      dispatcher(setSupport(supportData));
    }
  }, [transactionData, supportData]);

  useEffect(() => {
    if (loanData) {
      console.log("ALL LOANS ... :: ", loanData);
      dispatcher(setLoans(loanData));
      dispatcher(setRecentLoans(loanData?.docs?.slice(0, 6)));
    }
    if (requestData) {
      dispatcher(setLoanRequests(requestData));
    }
    if (companyData) {
      dispatcher(setCompanies(companyData));
    }

    if (approvedLoanData) {
      dispatcher(setApprovedLoans(approvedLoanData));
    }
    if (pendingLoanData) {
      dispatcher(setPendingLoans(pendingLoanData));
    }
    if (settledLoanData) {
      dispatcher(setSettledLoans(settledLoanData));
    }
    if (deniedLoanData) {
      dispatcher(setDeclinedLoans(deniedLoanData));
    }
    if (disbursedLoanData) {
      dispatcher(setDisbursedLoans(disbursedLoanData));
    }

    if (allCreditedLoanData) {
      dispatcher(setAlltimeCreditedLoans(allCreditedLoanData));
    }
    if (allSettledLoanData) {
      dispatcher(setAlltimeSettledLoans(allSettledLoanData));
    }
  }, [
    loanData,
    companyData,
    requestData,
    deniedLoanData,
    pendingLoanData,
    settledLoanData,
    approvedLoanData,
    disbursedLoanData,
    allSettledLoanData,
    allCreditedLoanData,
  ]);

  useEffect(() => {
    if (usersData) {
      dispatcher(setUsers(usersData));
    }
    if (adminsData) {
      dispatcher(setAdmins(adminsData));
    }
  }, [usersData, adminsData]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = allRoutes =>
    allRoutes.map(route => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.5rem'
      height='3.5rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='default' color='inherit'>
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <CssBaseline />
      {isAuth ? (
        layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName='FastQuid Admin'
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {/* {configsButton} */}
          </>
        )
      ) : (
        <></>
      )}

      {/* {layout === "vr" && <Configurator />} */}
      {!isAuth && !profileData ? (
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      ) : (
        <Routes>
          {getRoutes(routes)}
          <Route path='*' element={<Navigate to='/dashboard' />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}
