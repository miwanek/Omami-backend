import React, {Component} from 'react'

class RoomList extends Component {
    render() {
        return (
            <button onClick={() => {
                alert(this.props.roomName);
                this.props.setRoom(2)}}> # {this.props.roomName}</button>
        )
    }
}

export default RoomList