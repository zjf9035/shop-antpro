import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './index.css'

export default class EditorDemo extends React.Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
        // 调用父组件的函数，将编辑器输入的内容传递回去
        console.log(editorState.isEmpty());
        if(editorState.isEmpty()){
            this.props.setDetails("")
        }else{
            this.props.setDetails(editorState.toHTML())
        }
    }

    render () {
        const { editorState } = this.state
        return (
            <div className="my-component">
                <BraftEditor
                    value={editorState}
                    onChange={this.handleEditorChange}
                />
            </div>
        )

    }

}