import React from 'react';
import SwitchSelector from "react-switch-selector";
import { setMode } from '../store/sentences/action';
import { connect } from 'react-redux';

const Switch = (props) => {

    const options = [
        {
            label: "Master",
            value: "master",
            selectedBackgroundColor: "#0570b9",
        },
        {
            label: "Basic",
            value: "basic",
            selectedBackgroundColor: "#0570b9"
        }
    ];

    const onChange = (newValue) => {
        props.setMode(newValue)
    };

    const initialSelectedIndex = options.findIndex(({ value }) => value === "master");
    return (
        <div className="react-switch-selector-wrapper" style={{ marginTop: 20,width: 130, float: 'right' }}>
            <SwitchSelector
                onChange={onChange}
                options={options}
                initialSelectedIndex={initialSelectedIndex}
                backgroundColor={"#353b48"}
                fontColor={"#f5f6fa"}
            />
        </div>
    );
}


const mapStateToProps = (state) => ({
    mode: state.mode
});

const mapDispatchToProps = { setMode };

export default connect(mapStateToProps, mapDispatchToProps)(Switch);
