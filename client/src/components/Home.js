import React from 'react';
import { connect } from 'react-redux';
import { handleInputAction, fetchWishAction, handleSubmitAction, handleDeleteAction } from '../myactions/action';

class Home extends React.Component {

    componentDidMount() {
        this.props.fetchwish();
    }

    render() {
        const list = this.props.mywishes.map((item) => {
            return <a href="#" className="collection-item" key={item._id}
                onClick={() => this.props.handleDelete(item._id)}>{item.wish}</a>
        })
        return (
            <div>
                <form onSubmit={(e) => this.props.handleSubmit(e)}>
                    <input onChange={(e) => this.props.handleInput(e.target.value)} type="text" name="item" value={this.props.text} />

                    <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    </button>
                </form>

                <div className="collection">
                    {list}
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        text: state.text,
        mywishes: state.mywishes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInput: (input) => {
            dispatch(handleInputAction(input))
        },
        fetchwish: () => {
            dispatch(fetchWishAction())
        },
        handleSubmit: (e) => {
            dispatch(handleSubmitAction(e))
        },
        handleDelete: (id) => {
            dispatch(handleDeleteAction(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);