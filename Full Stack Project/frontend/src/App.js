import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Activate from './containers/Activate';
import ResetPass from './containers/ResetPass';
import ResetPassConfirm from './containers/ResetPassConfirm';
import RegStudent from "./containers/RegStudent";
import AddStudent from "./containers/AddStudent";
import AddNotice from "./containers/AddNotice";
import UpdateAttendance from "./containers/UpdateAttendance";
import ViewNotice from "./containers/ViewNotice";
import DailyReport from './containers/DailyReport';
import TotalReport from './containers/TotalReport';
import Layout from './hocs/Layout'
import { Provider } from "react-redux";
import store from './store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/reset-password" element={<ResetPass></ResetPass>}></Route>
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPassConfirm></ResetPassConfirm>}></Route>
            <Route path="/activate/:uid/:token" element={<Activate></Activate>}></Route>
            <Route path="/regStudent" element={<RegStudent></RegStudent>}></Route>
            <Route path="/addStudent" element={<AddStudent></AddStudent>}></Route>
            <Route path="/addNotice" element={<AddNotice></AddNotice>}></Route>
            <Route path="/viewNotice" element={<ViewNotice></ViewNotice>}></Route>
            <Route path="/update_attendance" element={<UpdateAttendance></UpdateAttendance>}></Route>
            <Route path="/daily_report" element={<DailyReport></DailyReport>}></Route>
            <Route path="/total_report" element={<TotalReport></TotalReport>}></Route>
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}


export default App;
