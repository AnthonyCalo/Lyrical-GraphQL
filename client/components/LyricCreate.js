import React from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import query from "../queries/fetchSong";

class LyricCreate extends React.Component{
    constructor(props){
        super(props);

        this.state= {content: ""};
    }

    onSubmit(event){
        event.preventDefault();
        this.props.mutate({
            variables: {
                content:this.state.content,
                songId: this.props.songId,
            }
        }).then(() => this.setState({content: ""}));
    }
    render(){
        return( 
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Add A lyric</label>
                    <input 
                        value={this.state.content}
                        onChange={event=>this.setState({
                            content: event.target.value
                        })}
                    />
                </form>
        )
    }
}

const mutation=gql`
    mutation AddLyricToSong($content: String, $songId: ID){
        addLyricToSong(content:$content, songId:$songId){
            id
            lyrics{
                id
                content
                likes
            }
        }
    }
`
export default graphql(mutation)(LyricCreate);