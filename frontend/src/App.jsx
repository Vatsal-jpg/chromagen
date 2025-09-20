import React from "react";
import "tailwindcss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loading from "./Pages/Loading";
import Home from "./Pages/Home";
import Preview from "./Pages/Preview";
import Layout from "./Pages/Layout";
import Genrate from "./Pages/Genrate";
import Learning from "./Pages/Learning";

function App() {
  return (
    <Router>
      <Routes>
        {/* Loading page without sidebar */}
        <Route path="/" element={<Loading />} />

        {/* Pages wrapped in Layout with sidebar */}
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/preview"
          element={
            <Layout>
              <Preview />
            </Layout>
          }
        />
        <Route
          path="/generate"
          element={
            <Layout>
              <Genrate />
            </Layout>
          }
        />

        <Route
          path="/learn"
          element={
            <Layout>
              <Learning />
            </Layout>
          }
        
        />

      </Routes>
    </Router>
  );
}

export default App;
