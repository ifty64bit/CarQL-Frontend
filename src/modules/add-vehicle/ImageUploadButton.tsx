import { Button, Input } from "@chakra-ui/react";
import React, { useRef } from "react";

type Props = {
    onImageSelect: (images: File[]) => void;
};

function ImageUploadButton({ onImageSelect }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files;
            onImageSelect(Array.from(file));
        }
    };

    return (
        <>
            <Button onClick={handleButtonClick}>Choose Image</Button>
            <Input
                type="file"
                accept="image/*"
                multiple
                ref={inputRef}
                display="none"
                onChange={handleInputChange}
            />
        </>
    );
}

export default ImageUploadButton;
