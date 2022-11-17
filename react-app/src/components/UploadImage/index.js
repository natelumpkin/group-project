import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const UploadPicture = ({post}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('HELLO FROM UPLOAD IMAGE')
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/media/${post.id}`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            setImageLoading(false);
            history.push("/home");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            const errors = await res.json()
            console.log(errors)
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default UploadPicture;
