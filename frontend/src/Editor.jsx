import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function Editor(props) {
    const handleQuillChange = (e) => {
        // eslint-disable-next-line react/prop-types
        props.onContentChange(e)
    }
    const modules = {
        toolbar: {
            container: [
                [{'header': [1, 2, 3, 4, false]}],
                ["bold", "underline", "italic", "strike"],
                [{'color': []}, {'background': []}],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'list': 'check'}],
                ['link', 'image'],
                ['clean']
            ],
        },
    };

    const formats = [
        "header",
        "bold", "underline", "italic", "strike",
        'color', 'background',
        'list', 'bullet', 'check',
        'link', 'image',
        'clean'
    ];
    return (
        <>
            <ReactQuill
                className="form-control"
                style={{"height": "500px"}}
                modules={modules}
                formats={formats}
                onChange={handleQuillChange}
                placeholder='펀딩에 대한 상세 내용을 입력해주세요.'
            />
        </>
    );
}

export default Editor;