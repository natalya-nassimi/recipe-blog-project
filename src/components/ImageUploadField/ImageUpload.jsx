export default function ImageUploadField() {
    
    const handleFileUpload = async(e) => {
        const file = e.target.files[0]
    }

    return (
        <>
            <input type='file' name='image' id='image' onChange={handleFileUpload} />
        </>
    )
}