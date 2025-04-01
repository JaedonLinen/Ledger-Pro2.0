import React, { useEffect, useState } from 'react'
import { BiX } from "react-icons/bi";
import './FilesTableModal.css'

function FilesTableModal({closeModal, id, existing, updateCallback}) {

    const [files, setFiles] = useState([])
    const [fileName, setFileName] = useState(""); // Default to an empty string
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (existing){
            fetchFiles()
        }
    }, [])

    const fetchFiles = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/get_files/${id}`);
            const data = await response.json();
            setFiles(data.allFiles);
        } catch (error) {
            console.error("Failed to fetch files:", error);
            setFiles([]);  // Ensure files is always an array
        }
    };

    const handleFileChange = (event) => {
        if (!event.target.files.length) return;
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent unexpected page reload

        if (!fileName.trim()) {
            alert("Please enter a file name.");
            return;
        }
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        // Create FormData object for file upload
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("file_name", fileName);

        try {
            await updateCallback(fileName, formData);
            setFileName(""); // Reset file name input
            setSelectedFile(null); // Clear selected file
        } catch (error) {
            console.error("File upload failed:", error);
            alert("Failed to upload file.");
        }
    };

  return (
    <div className="modal-container">
            <div className="modal">
                <div className="exit-btn-container">
                    <BiX className="userModal-exit-btn" size='35' onClick={closeModal} />
                </div>
                <h1>Files</h1>

                {existing ? (
                    <div className="files-table-master-container">
                        <table>
                            <caption>List of all files related to this transaction</caption>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map((file) => (
                                    <tr key={file.document_entry_id}>
                                        <td data-cell="file name">{file.filename}</td>
                                        <td data-cell="download">{file.file_data ? "Download" : ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="files-con">
                        <div className="file-input-con">
                            <p>File name: </p>
                            <div className="input-con">
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="file-input-con">
                            <p>Insert File: </p>
                            <div className="input-con">
                                <input
                                    type="file"
                                    className="custom-file-label"
                                    id="fileUpload"
                                    name="file"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="add-btn-container">
                            <button type="submit" title="Upload file" className="addUserModalOpen-btn">
                                Add
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
  )
}

export default FilesTableModal