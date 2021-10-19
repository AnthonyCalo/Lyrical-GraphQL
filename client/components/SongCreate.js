import React from 'react';
import gql from "graphql-tag";
import {graphql} from "react-apollo";
import {Link, hashHistory} from "react-router";
import query from "../queries/fetchSongs"

class SongCreate extends React.Component {
    constructor(props){
        super(props);

        this.state={title: ""}
    }
    componentDidMount() {
        console.log(this.props, "this.props")
    }
    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{query}]
        }).then(() =>{
            hashHistory.push('/')
        })

    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h2>Create a new song</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Title: </label>
                    <input value={this.state.title} onChange={e=>this.setState({title: e.target.value})} />
                </form>
            </div>)
    }
}
const mutation = gql`
mutation($title: String){
    addSong(title:$title){
        title
    }
}`

export default graphql(mutation)(SongCreate);