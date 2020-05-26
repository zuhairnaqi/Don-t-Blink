import React, { Component } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
// import 'prismjs/components/prism-clike';
// import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-erlang'
import 'prismjs/themes/prism-twilight.css'

// const code = `function add(a, b) {
//     return a + b;
//   }
//   `;
export default class EditCode extends Component {
    constructor() {
        super()
        this.state = { code: 'type here...' };
    }
    render() {
        return (<Editor
            value={this.state.code}
            onValueChange={code => this.setState({ code })}
            highlight={code => highlight(code, languages.erlang)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
            }} />)
    }
}