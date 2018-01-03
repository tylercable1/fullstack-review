import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul> 
      {props.repos.map((repo) =>
        <li>
          <h3>{repo.reponame} </h3>
          <span onClick={props.usernameClick} className="username"> Username: {repo.username}</span>
        </li>
      )}
    </ul>
  </div>
)

export default RepoList;