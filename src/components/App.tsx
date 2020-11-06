import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Gallery from './Common/Gallery';
import { ContentProvider } from '../context/ContentContext';

function App() {
  console.log();
  return (
    <BrowserRouter>
      <ContentProvider>
        <Layout>
          <Gallery />
        </Layout>
      </ContentProvider>
    </BrowserRouter>
  );
}

export default App;
