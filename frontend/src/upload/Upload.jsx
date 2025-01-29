import { IKContext, IKUpload } from "imagekitio-react";
import { useEffect, useRef } from "react";
import useConversation from "../zustand/useConversation";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("https://messenger-rabbithole-backend.onrender.com/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const {selectedConversation} = useConversation();
  const ikUploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
  
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress) => {
   
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    setImg('');
  },[selectedConversation])
  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      {
        <label className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer" onClick={() => ikUploadRef.current.click()}>
          <img className="w-4 h-4" src="/attachment.png" alt="" />
        </label>
      }
    </IKContext>
  );
};

export default Upload;