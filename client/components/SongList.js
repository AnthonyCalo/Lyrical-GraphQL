import React from 'react';
import gql from 'graphql-tag';
import {graphql} from "react-apollo";
import {Link }from "react-router";
import query from "../queries/fetchSongs";
import "./styles.css";

class SongList extends React.Component {
    onSongDelete(id){
        this.props.mutate({ variables: {id}})
            .then(()=>this.props.data.refetch());
    }
    renderSongs(){
        if(this.props.data.loading){
            return( 
                <div>Loading..</div>
            )
        }else{
            console.log(this.props.data.songs)
            return this.props.data.songs.map(song =>{

                return( 
                    <li className="collection-item" key={song.id}>
                        <Link to={`/songs/${song.id}`}>{song.title}</Link>
                        <i
                            className="material-icons right"
                            onClick={() => this.onSongDelete(song.id)}
                        >delete</i>
                    </li>
                )
            })
        }
    }
    render(){
        return(
            <div className="songList">
                <ul className="collection">
                    {this.renderSongs()}
                </ul>
                <Link 
                    to="/songs/new"
                    className="btn-floating btn-large red right"
                >
                    <i className="material-icons">add</i>
                    
                </Link>
            </div>)
        }
        
}
const mutation=gql`
    mutation DeleteSong($id: ID){
        deleteSong(id:$id){
            id
        }
    }
`

export default graphql(mutation)(graphql(query)(SongList))

