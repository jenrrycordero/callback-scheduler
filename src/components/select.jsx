import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import "./select.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      selected: 0
    };
    this.close = this.close.bind(this);
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.state.listOpen
        ? window.addEventListener("click", this.close)
        : window.removeEventListener("click", this.close);
    }, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.close);
  }

  close(timeOut) {
    this.setState({ listOpen: false });
  }

  selectItem(id) {
    this.setState( {listOpen: false}, this.props.onSelect(id, this.props.name) );
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  }

  render() {
    const { listOpen } = this.state;
    const headerTitle = this.props.list.filter(item => item.selected)[0].title;

    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">
            <span>{headerTitle}</span>
          </div>
          {listOpen ? (
            <IconContext.Provider value={{ className: "selectIcon" }}><FaCaretUp /></IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ className: "selectIcon" }}><FaCaretDown /></IconContext.Provider>
          )}
        </div>
        {listOpen && (
          <ul className="dd-list" onClick={e => e.stopPropagation()}>
            {this.props.list.map(item => (
              <li
                className={
                  item.selected ? "dd-list-item selected" : "dd-list-item"
                }
                key={item.id}
                onClick={() => this.selectItem(item.id)}
              >
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;
