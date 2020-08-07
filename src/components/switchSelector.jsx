import React from 'react';
import SwitchSelector from "react-switch-selector";
import { setMode } from '../store/sentences/action';
import { connect } from 'react-redux';

const Switch = (props) => {

    const options = [
        {
            label: "Memory",
            value: "memory",
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

    const initialSelectedIndex = options.findIndex(({ value }) => value === "basic");
    return (
        <div className="react-switch-selector-wrapper" style={{
            width: '150px',
            float: 'right',
            height: '35px'
        }}>
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
