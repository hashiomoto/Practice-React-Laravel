import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
  } from 'react-router-dom';
  import Example from './pages/Example'; 
  // Exampleの下にHome.jsをインポートする
  import Home from './pages/Home';
  
  import PostEdit from './pages/PostEdit'; //追記
    function App() {
      return (
          <div>
              <Switch>
                  <Route path='/example' element={<Example />} />
                  // ここに記載されているのは間違い？
                  <Route path='/' element={<Home />} />
              </Switch>
          </div>
      );
  }
  
  ReactDOM.render((
    <BrowserRouter>
    <Routes>
        <Route path='/example' element={<Example />} />
        //ここが正しい？
        <Route path='/' element={<Home />} />
        <Route path='/post/edit/:id' element={<PostEdit/>} /> //追記

    </Routes>
</BrowserRouter>
  ), document.getElementById('app'))
