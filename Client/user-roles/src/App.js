import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';



function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={SignIn} />
      <Route path="/home" component={Home} /> 
         
    </BrowserRouter>
  );
}

export default App;
