import * as React from 'react';
import {FormGroup, Label, Input, Form } from 'reactstrap';

interface UploadContainerState {

    tcknVkn: number;
    proclamationYear: number;
    alertVisible: boolean;

    //file: FileList
}
export default class Upload extends React.Component<{}, UploadContainerState> {
    public file!: File;
    constructor(props: any) {
        super(props);
        this.state = {
            proclamationYear: 0,
            tcknVkn: 0,
            alertVisible: false
        }
        this.uploadFile = this.uploadFile.bind(this);
        this.fileChange = this.fileChange.bind(this);

    }
    onDismiss() {
        this.setState({ alertVisible: false });
    }

    fileChange(event: any) {
        this.file = event.target.files[0];
        event.preventDefault();

    }

    render() {
        return (
            <div>

                <Form onSubmit={this.uploadFile} className="uploader" encType="multipart/form-data" >

                    <FormGroup>
                        <Label for="dataFile">Data file</Label>
                        <input type="file" name="dataFile" accept=".csv,.txt" className="upload-file" onChange={this.uploadFile} />
                        <Label for="codeFile">Code file</Label>
                        <input type="file" name="codeFile" accept=".py" className="upload-file" onChange={this.uploadFile} />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="batch">Batch</Label>
                        <Input type="text" name="batch" />
                        <Input type="submit" value="Start"></Input>
                    </FormGroup>
                    
                    <FormGroup>
                        <div>
                        <Label for="work">work</Label>
                        <Input name="work" type="text" disabled />
                        </div>
                        <div>
                        <Label for="status">status</Label>
                        <Input name="status" type="text" disabled />
                        </div>
                    </FormGroup>

                    
                </Form>
            </div>
        );
    }
    uploadFile(event: any) {
        let that = this;
        this.fileChange(event)
        event.preventDefault();
        console.log(this.file)
        let formData = new FormData();
        formData.append('file', this.file);
        fetch("http://localhost:5000/upload", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, */*',
            },
            body: formData
        })
            .then(handleErrors)
            .then(function (response) {
                console.log("ok");
            }).catch(function (error) {

                console.log(error);
            });
    }
};
function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}