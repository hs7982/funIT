import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import ImageResize from "quill-image-resize";
import {axiosPostNewImage} from "../api/axios.js";

Quill.register('modules/imageResize', ImageResize);

function Editor(props) {
    const [value, setValue] = useState("");
    const quillRef = useRef();
    const handleQuillChange = (e) => {
        // eslint-disable-next-line react/prop-types
        props.onContentChange(e)
        setValue(e)
    }

    const imageUploadHandler = async () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener('change', async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("image", file);

            await axiosPostNewImage(formData).then((result) => {
                const imageUrl = result.data.data;
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();
                editor.insertEmbed(range.index, 'image', imageUrl);
            }).catch((error) => {
                console.log(error);
                alert("이미지 업로드에 실패했습니다.\n" + error.response.data.message);
            });
        })
    }
    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{'header': [1, 2, 3, 4, false]}],
                    ["bold", "underline", "italic", "strike"],
                    [{'color': []}, {'background': []}],
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
                    ['link'],
                    ['image'],
                    ['clean']
                ],
                handlers: {
                    image: imageUploadHandler,
                },
            },
            imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize", "Toolbar"],
            },
        }
    }, []);

    const formats = [
        "header",
        "bold", "underline", "italic", "strike",
        'color', 'background',
        'align', 'center', 'right', 'justify',
        'list', 'bullet', 'check',
        'link', 'image',
        'clean'
    ];

    useEffect(() => {
        setValue(props.oriContent)
    }, [props.oriContent]);
    return (
        <>
            <ReactQuill
                ref={quillRef}
                className="form-control"
                style={{"height": "500px"}}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={handleQuillChange}
                placeholder='상세 내용을 입력해주세요.'
            />
        </>
    );
}

export default Editor;