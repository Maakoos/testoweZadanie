import { useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import AppContext from "context/AppContext";
import GlobalStyle from "styles/GlobalStyle";

import MainView from "views/MainView";
import PhotosListView from "views/PhotosListView";
import PhotoModal from "components/PhotoModal";
import Loader from "components/Loader";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [photosList, setPhotosList] = useState([]);
  const [value, setValue] = useState("");
  const [pageNumber, setPageNumber] = useState(2);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [photoInModal, setPhotoInModa] = useState();
  const [headingValue, setHeadingValue] = useState("");
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = async (number, photoName) => {
    setShowLoadMoreBtn(true);
    setShowLoader(true);
    document.body.style.overflow = "hidden";
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=${number}&query=${photoName}&client_id=${WEATHER_API_KEY}`
      );
      if (response.ok) {
        setTimeout(() => {
          setShowLoader(false);
          document.body.style.overflow = "visible";
        }, 1000);
        const data = await response.json();

        if (data.results.length < 10) {
          setShowLoadMoreBtn(false);
        }
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchPhoto = async (e, photoName) => {
    setHeadingValue(photoName);
    setPageNumber(2);
    e.preventDefault();
    const result = await fetchData(1, photoName);
    setPhotosList([...result.results]);
  };

  const fetchMorePhotos = async (e) => {
    e.preventDefault();
    setPageNumber((prevValue) => prevValue + 1);
    const result = await fetchData(pageNumber, value);
    setPhotosList([...photosList, ...result.results]);
  };

  const handleOnChange = (e) => setValue(e.target.value);

  const openModal = (id) => {
    setModalIsVisible(true);
    const item = photosList.filter((photo) => photo.id === id);
    setPhotoInModa(...item);
  };
  const closeModal = () => setModalIsVisible(false);

  const contextValue = {
    value,
    setValue,
    handleOnChange,
    photosList,
    searchPhoto,
    fetchMorePhotos,
    openModal,
    closeModal,
    photoInModal,
    headingValue,
    showLoadMoreBtn,
  };
  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter basename={"/"}>
        <div className="App">
          <GlobalStyle />
          <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/photos" component={PhotosListView} />
          </Switch>
          {modalIsVisible ? <PhotoModal /> : null}
          {showLoader ? <Loader /> : null}
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
}

export default App;
