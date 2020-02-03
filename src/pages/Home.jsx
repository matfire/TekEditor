import React, { useState } from 'react'
import { MDBContainer, MDBInput, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact'
import {Controlled as CodeMirror} from 'react-codemirror2'
import {Container, Button, Link} from 'react-floating-action-button'
require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css')
require('codemirror/mode/htmlmixed/htmlmixed')
require("codemirror/mode/htmlembedded/htmlembedded")
require('codemirror/theme/material.css');

const Home = () => {

	const [content, setContent] = useState("")
	const [language, setLanguage] = useState("js")
	const [file, setFile] = useState(new File([], "null"))
	const [fileHandler, setFileHandler] = useState()

	const saveFile = async() => {
		let handler = fileHandler
		if (file.name === "null") {
			const opts = {
				type: 'saveFile'
			}
			handler = await window.chooseFileSystemEntries(opts)
			setFileHandler(handler)
		}

			const writer = await handler.createWriter()
			await writer.write(0, content)
			await writer.close()

	}

	const selectNewFile = async() => {
		let filePlaceholder = await window.chooseFileSystemEntries()
		let file = await filePlaceholder.getFile()
		setFile(file)
		setFileHandler(filePlaceholder)
		let content = await file.text()
		setContent(content)
	}
	return (
		<MDBContainer fluid>
			<MDBRow>
				<MDBCol size="11" className="">
					<CodeMirror
						className="editor"
						value={content}
						onBeforeChange={(editor, data, value) => {
							setContent(value)
						}}
						options={{theme:"material", lineNumbers:true}}
					>
					</CodeMirror>

				</MDBCol>
				<MDBCol size="1">
				<MDBBtn color="red" floating onClick={() => selectNewFile()}>
						<MDBIcon icon="file" />
					</MDBBtn>
					<MDBBtn color="green" floating onClick={()=> saveFile()}>
						<MDBIcon icon="save" />
					</MDBBtn>
				</MDBCol>
			</MDBRow>
			
		</MDBContainer>
	)
}

export default Home