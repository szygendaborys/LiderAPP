import React, { Component } from 'react'
import { withFirebase } from '../Firebase'
import FileUploader from 'react-firebase-file-uploader'

import '../../scss/Admin.scss'

class AdminPostModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isUploading:false,
            progress:0,
            imgURL:''
        }

        this.hideModal = this.hideModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.sendURL = this.sendURL.bind(this);
        
    }

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
      this.setState({ isUploading: false });
      console.error(error);
    };
    handleUploadSuccess = filename => {
      this.setState({ isUploading: false, progress: 100});
      this.props.firebase.postimg()
        .child(filename)
        .getDownloadURL()
        .then(url => this.sendURL(url));
        
    };

    sendURL(url) {
        this.props.onUploadImage(url);
    }

    hideModal() {
        document.getElementById('admin-modal__post').classList.add('hidden');
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.props.post.id) {
            console.log('zmiana');
            this.props.firebase.posts().doc(this.props.post.id).set({
                date:this.props.firebase.fieldValue.serverTimestamp(),
                desc:this.props.post.desc,
                imgURL:this.props.post.imgURL,
                text:this.props.post.text,
                title:this.props.post.title 
            })

        } else {
            this.props.firebase.posts().add({
                date:this.props.firebase.fieldValue.serverTimestamp(),
                desc:this.props.post.desc,
                imgURL:this.props.post.imgURL,
                text:this.props.post.text,
                title:this.props.post.title 
            })
        }

        document.location.reload();

    }

    render() {
        return (
            <div className='admin-modal hidden' id='admin-modal__post'>
                <div className='modal-content'>
                    {this.props.post.title === "" ? <h1>Nowy Post</h1> : <h2>{this.props.post.title}</h2>}
                    <form>
                        <div className='form-component'>
                            <p>Tytuł:</p>
                            <input required type='text' name='title' value={this.props.post.title} placeholder='Tytuł' onChange={e => this.props.handleChange(e)} id='form-title'/>
                        </div>
                        <div className='form-component'>
                            <p>Krótki Opis:</p>
                            <textarea required rows='3' name='desc' value={this.props.post.desc} placeholder='Opis' onChange={e => this.props.handleChange(e)} id='form-desc'/>
                        </div>
                        <div className='form-component'>
                            <p>Tekst:</p>
                            <textarea required rows='6' name='text' value={this.props.post.text} placeholder='Tekst' onChange={e => this.props.handleChange(e)} id='form-text'/>
                        </div>
                        <div className='form-component'>
                            <p>Zdjęcie do posta</p>
                            <label className='form-image'>
                                <p className='modal-upload-btn'>Wybierz zdjęcie</p>
                                <FileUploader 
                                    hidden
                                    accept='image/*'
                                    name='imgURL'
                                    randomizeFilename
                                    storageRef={this.props.firebase.postimg()}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}    
                                    onProgress={this.handleProgress} 
                                />
                            </label>
                            {this.state.isUploading && <p>Progress: {this.state.progress}/100%</p>}
                            {this.props.post.imgURL && <p className='postimg-preview'>Podgląd: <img src={this.props.post.imgURL} alt='Post Preview'/></p>}
                        </div>
                        <button className='modal-submit' type='submit' onClick={e => this.onSubmit(e)}>Zatwierdź</button>
                    </form>

                    <button className='modal-close' onClick={() => this.hideModal()}>x</button>
                </div>
            </div>
        )
    }
}

export default withFirebase(AdminPostModal);