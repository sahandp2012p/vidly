import React, { Component } from 'react';

class Like extends Component {
	state = {
		liked: false
	};

	classNames = () => {
		return this.state.liked ? 'fa fa-heart' : 'fa fa-heart-o';
	};

	render() {
		this.classNames();
		return <i onClick={() => this.setState({ liked: !this.state.liked })} className={this.classNames()} />;
	}
}

export default Like;
