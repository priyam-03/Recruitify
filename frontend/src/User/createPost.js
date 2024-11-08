// src/shared/components/CreatePost.js
import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import CteatepostTextsection from '../shared/components/CreatepostTextSection';
import './CreatePost.css'; 


const CreatePost = ({ showModal, handleShowCreatePost }) => {
    return (
        showModal && (
            <div className="modal">
                <div className="modal-content">
                    <h4>Craft your opportunity or your dream job—</h4>
                    <h3>This is your space!</h3>
                    <CloseIcon onClick={handleShowCreatePost} className="close-button" />
                    <br />
                    <CteatepostTextsection setShowThis={handleShowCreatePost} />
                </div>
            </div>
        )
    );
};

export default CreatePost;
