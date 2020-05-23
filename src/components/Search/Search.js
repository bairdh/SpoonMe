import React, { Component } from "react";
import { connect } from "react-redux";

class Search extends Component{

handleClick =() =>{
    this.props.dispatch({type:'FETCH_RANDOM_RECIPES'});
}

    render(){
        return(
            <div>
                This is my search page!
                <br/>
                <button onClick={this.handleClick}>Test API</button>
            </div>
        ) //return
    } //render
} //class

const reduxToProps = data => ({data})

export default connect(reduxToProps)(Search);