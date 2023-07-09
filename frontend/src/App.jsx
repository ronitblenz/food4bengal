import "./App.css"

import HomePage from "./pages/HomePage"
import AllNGOS from "./pages/AllNGOS"
import NGOPage from "./pages/NGOPage"
import FoodDetails from "./pages/FoodDetails"
import ConfirmFoodDetails from "./pages/ConfirmFoodDetails"
import CategorySelection from "./pages/CategorySelection"
import ChooseRole from "./pages/ChooseYourRole"
import DeliverSelection from "./pages/DeliverSelection"
import DonationSelection from "./pages/DonationSelection"
import Signup from "./pages/Signup"
import FirstPage from "./pages/FirstPage"
import Profile from "./pages/Profile/Profile"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import AuthProvider, { AuthState } from "./StateManagement/contextapi"
import { Switch, Redirect } from "react-router-dom"


axios.defaults.baseURL = process.env.REACT_APP_PUBLIC_URL



const App = () => {

  const [ngoData, setData] = useState(null)

  const getNgoData = async () => {
    try {
      const { data } = await axios.get('/ngos/getNGOs')
      setData(data)
    } catch (err) {
      console.log(err)
    }
  }




  const [userData, setUser] = useState({ isFetched: false, user: null })

  // const getUser = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/user`,
  //       {
  //         withCredentials: true
  //       }
  //     )
  //     setUser({ isFetched: true, user: data.user })
  //   } catch (err) {
  //     setUser({ isFetched: true, user: null })
  //   }
  // };

  const {user}=AuthState()
  const [userExist, setUserExist]= useState(false)
  useEffect(() => {
    if(user.email!=='' && user.name!=='') setUserExist(true)
    // getUser()
     getNgoData()
  }, [user])


  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setInterval(() => {
      setLoading(false)
    }, 1500)
  }, [])



  const [foodData, setFoodData] = useState({ type: '', meal: '', quantity: 0 })

  const handleInput = (e) => {
    const { name, value } = e.target
    setFoodData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
      withCredentials: true,
    });
    setUser({ user: null, isFetched: true });
  }


  if (isLoading) {
    return (
      <div className="App">
        <FirstPage />
      </div>
    )
  }

  return (
//     <>

// <Routes>
//     <Route path="/" element={<Signup />}/>
//     <Route path="/profile" element={<Profile/>}/>
//     <Route path="/donationType" element={<FoodDetails/>}/>
//     <Route path="/categorie" element={<CategorySelection/>}/>
//     <Route path="/foodDetails" element={<FoodDetails/>}/>
//     <Route path="/chooseRole" element={<ChooseRole/>}/>
//     <Route path="/delivery" element={<DeliverSelection/>}/>
//     <Route path="/all" element={<HomePage data={ngoData}/>}>
//     <Route path=":id" element={<NGOPage data={ngoData}/>}/>
//     </Route>



//</Routes>

    
//    </>
    
    <div className="App">
      <Switch>
        <Route path='/login' exact>
          {!userExist ? <Signup /> : <Redirect to='/' />}
        </Route>

        <Route path="/profile" component={Profile}>
          {userExist?<Profile user={user} logout={logout} /> : <Redirect to='/login' />}
        </Route>

        <Route exact path="/">
          {userExist && ngoData ? <HomePage data={ngoData} /> : <Redirect to='/login' />}
        </Route>

        <Route path="/all" exact>
          {userExist && ngoData ? <AllNGOS data={ngoData} /> : <Redirect to='/login' />}
        </Route>

        <Route path="/all/:id" exact>
          {userExist && ngoData ? <NGOPage data={ngoData} /> : <Redirect to='/login' />}
        </Route>

        <Route path="/chooseRole" exact>
          {userExist ? <ChooseRole /> : <Redirect to='/login' />}
        </Route>

        <Route path="/categorie" exact>
          {userExist ? <CategorySelection /> : <Redirect to='/login' />}
        </Route>

        <Route path="/donationType" exact>
          {userExist ? <DonationSelection /> : <Redirect to='/login' />}
        </Route>

        <Route path="/foodDetails" exact>
          {userExist ? <FoodDetails handleInput={handleInput} /> : <Redirect to='/login' />}
        </Route>

        <Route path="/confirmFoodDetails" exact>
          {userExist ? <ConfirmFoodDetails foodData={foodData} /> : <Redirect to='/login' />}
        </Route>

        <Route path="/delivery" exact>
          {userExist ? <DeliverSelection /> : <Redirect to='/login' />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
