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
        this.uploadDataFile = this.uploadDataFile.bind(this);
        this.uploadCodeFile = this.uploadCodeFile.bind(this);
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

                <Form onSubmit={this.submit} className="uploader" encType="multipart/form-data" >

                    <FormGroup>
                        <Label for="dataFile">Data file</Label>
                        <input type="file" name="dataFile" accept=".csv,.txt" className="upload-file" onChange={this.uploadDataFile} />
                        <Label for="codeFile">Code file</Label>
                        <input type="file" name="codeFile" accept=".py" className="upload-file" onChange={this.uploadCodeFile} />
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

    submit(){

    }

    uploadFile(event: any, url: string){
        let that = this;
        this.fileChange(event)
        event.preventDefault();
        console.log(this.file)
        let formData = new FormData();
        formData.append('file', this.file);
        fetch(url, {
            method: 'POST',
            credentials: 'omit',
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

    uploadDataFile(event: any) {
        this.uploadFile(event, "http://localhost:5000/upload_data");
    }

    uploadCodeFile(event: any) {
        this.uploadFile(event, "http://localhost:5000/upload_code");
    }
};
function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
