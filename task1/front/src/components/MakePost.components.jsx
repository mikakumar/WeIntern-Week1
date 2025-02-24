import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';

const MakePost = () =>{

    const [redirect, setRedirect] = useState(false);

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState('');
    const [content, setContent] = useState('');
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list',  'indent',
        'link', 'image'
      ];

      async function newPost() {
        const formdata = new FormData();
        formdata.set('title', title);
        formdata.set('summary', summary); 
        formdata.set('file', files[0]);
        formdata.set('content', content);
        formdata.preventDefault();
        const response = await fetch("http://localhost:3000/postMaker", {
            method: 'POST',
            body: formdata
        });
        if(response.ok){
            setRedirect(true);
        }
      }

      if(redirect){
        return <Navigate to={'/'}/>
      }

    return(
        <>
        <div>
            <form action="" onSubmit={newPost} className="border-2 border-black w-[100%] h-[87 vh]">
                <div>
                <i className="fi fi-sr-pen-nib edit-icons   "></i>
                <input type="text" className="font-mark edit-post-field " placeholder="Title" 
                onChange={data=>setTitle(data.target.value)} 
                
                />
                </div>
                <div>
                <i className="fi fi-rr-book-bookmark edit-icons "></i>
                <input type="text" placeholder="Summary" className="font-mark edit-post-field" onChange={data=>setSummary(data.target.value)} />
                </div>
                
                <input type="file" className=" border-2 border-black py-3 ml-13 my-4" name="photo" id="" onChange={data=>setFiles(data.target.files)}/>
                Image Upload

                <ReactQuill theme="snow" value={content} modules={modules} formats={formats} className="w-[90%] mx-10 h-[40vh]" onChange={data=>setContent(data)} />  
                <button type="submit" className="quill-style font-dm" >Create Post</button>
            </form>
        </div>
        </>
    )
}

export default MakePost;