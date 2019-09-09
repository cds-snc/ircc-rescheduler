/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from "react";

export default class TimeForm extends Component {
  changeHandler = (value, id) => {
    if (value) {
      this.props.onSelect(id);
    } else {
      // handle de-select
    }
  };

  render() {
    const { rowData, selectedId } = this.props;
    const { id, Time } = rowData;
    const isChecked = Time === selectedId;

    return (
      <tr>
        <td>
          <input
            id={`checkbox_${id}`}
            checked={isChecked}
            onChange={e => this.changeHandler(e.target.checked, Time)}
            type="checkbox"
            name="record"
          />
        </td>
        <td>{Time}</td>

      </tr>
    );
  }
}
