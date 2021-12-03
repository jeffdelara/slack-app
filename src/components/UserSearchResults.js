import React from "react";

const UserSearchResults = (props) => {
    const {matchedTerms, setUser} = props; 
    const searchResults = matchedTerms;

    const results = searchResults.map(user => {
        return <SearchItem name={user.email} setUser={setUser} id={user.id} />
    });

    return (
        <>
        {results}
        </>
    )
}

const SearchItem = (props) => {
    const { id, name, setUser } = props;

    const confirmReceiver = (e, id) => {
        e.preventDefault();
        console.log(id);
        setUser({id, name});
    }

    return (
        <div className="channel-message" key={id}>
            <div className="sender-pic"><img src="https://a.slack-edge.com/d4111/img/apps/workflows_192.png" alt="" /></div>
            <div className="sender">
                <div className="sender-name"><a href="#" onClick={(e) => confirmReceiver(e, id)}>{name}</a></div>
                <div className="muted">ID: {name}</div>
            </div>
        </div>
    )
}

export default UserSearchResults;
