import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getRepos = this.getRepos.bind(this)
  }

  componentDidMount () {
    this.getRepos()
  }
  usernameClick () {
    console.log('yo')
  }

  getRepos () {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (data) => {
        this.setState({
          repos: data
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  search (term) {
    $.ajax({
      url: 'http://localhost:1128/repos',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify({queryStr: term}),
      success: (data) => {
        console.log('search was successful', data);
        this.getRepos();
      },
      error: (error) => {
        console.log(error);
      }
    });
    console.log(`${term} was searched`);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList usernameClick={this.usernameClick.bind(this)} repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));