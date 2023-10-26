import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header/Header";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharacterPage = lazy(() => import("../pages/SingleCharacterPage/SingleCharacterPage"));

const App = () => {
  return (
    <Router>
      <main className="App">
        <Header />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/React-app-Marvell" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
            <Route path="/comics/:comicId" element={<SingleComicPage />} />
            <Route path="/characters/:characterId" element={<SingleCharacterPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

export default App;
