import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul> 
      {props.repos.map((repo) =>
        <li key={repo.id}>
          <h3>{repo.reponame} </h3>
          <a href={repo.url} className="username"> Username: {repo.username}</a>
        </li>
      )}
    </ul>
  </div>
)

export default RepoList;