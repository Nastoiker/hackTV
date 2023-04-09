import axios from "axios";
import {useState} from "react";
export const UpdateAvatarProfile = () => {
    const [error, setError] = useState<string>();
    const [file, setFile] = useState<File>();
    const [onDrag, setOnDrag] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<any>();

    const onSelectFile = (e: any) => {
        e.preventDefault();
        const reader = new FileReader();

        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        const file = e.target.files[0];
        setFile(file);
        uploadedFile(file);
    }
    const uploadedFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFile(reader.result);

        };
    };
    const onDrop = (e: any) =>  {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFile(file);
        uploadedFile(file);
        setOnDrag(true);
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();

        setOnDrag(false);
    };
    return (<>

            <div onDrop={onDrop} className="w-full mx-auto" onDragOver={handleDragOver}>
            {
              onDrag ?  <div className=" scale-75 bg-sky-700 shadow-xl  bg-blue transition-all duration-300 h-96">   <div className="mx-auto"> <UploadedIcon /></div>

 </div> : <div className="h-96 ">    </div>
            }
            </div>
    </>);
}
