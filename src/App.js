import logo from './logo.svg';
import './App.css';
import Search from './components/Search.js'
import React from 'react';
import unsplash from "./api/unsplash";
import ImageList from "./components/ImageList"
class App extends React.Component {

  state ={images: []}

  onSearchSubmit = async (term) =>{
    // console.log(term)

    const response = await unsplash.get('/search/photos', {
      params: {
        query: term,
      },
      headers: {
        Authorization: 'Client-ID L8L8fcbOerBdvWEuaxAp3rdhY7qgxZJEjZu6E_8RRV8',
      }
    });
    this.setState({images :response.data.results})
  }
  render() {
    return (
      <div className='ui container' style={{ marginTop: '20px' }}>
        <Search onSubmit={this.onSearchSubmit} />
        Found {this.state.images.length}

        <ImageList ImgList={this.state.images}/>
      </div>
    );
  }
}

export default App;
