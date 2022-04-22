import React from "react";


class Search extends React.Component {

    state = { term: '' };

    onInnputChnage(event) {
        console.log(event.target.value);
    }
    onSearchSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term)
    }

    render() {
        return (<div>
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onSearchSubmit}>
                    <div className="field">
                        <label>Search</label>
                        <input type="text" name="searchText" value={this.state.term} onChange={(event) => { this.setState({ term: event.target.value }) }} />
                    </div>
                </form>

            </div>
        </div>);
    }
}

export default Search