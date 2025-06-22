import { Provider, useDispatch, useSelector } from 'react-redux';
import Router from './Pages/Router/Router';
import { store } from './Redux/Store/Store';
import { useEffect } from 'react';
import { getUserProfileAction } from './Redux/User/Action';
import { useNavigate } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("token");
  const { post } = useSelector((store) => store);

  useEffect(() => {
    if(jwtToken)
      dispatch(getUserProfileAction(jwtToken));
  }, [post.createdPost, post.savedPost, post.unsavedPost])

  return (
    <Provider store = {store}>
    <div className="App">
      <Router />
    </div>
    </Provider>
  );
}

export default App;
