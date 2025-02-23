import placeholder_img from '../assets/placeholder-image.jpg'

const Post = () =>{
    return(
            <div className=" ml-[10vw] mt-[10vh] h-[60%] w-[70%] flex flex-row">
                <div className='relative max-width-[100%] border-2'>
                <img src={placeholder_img} alt="" className=" "/>
                </div>
                <div>
                <h2 className="font-dm relative text-black   text-3xl ml-[3vw] py-2 w-100 h-20">Lorem ipsum dolor sit amet, consectetur adipiscing </h2>
                <div>
                <div className="flex flex-row gap-3">
                    <p className='text-sm ml-10'>Hieronymous Bosch</p>
                    <p className="text-sm ">yyyy-mm-dd hh:mm:ss</p>
                </div>
                <p className="mt-[2vh] w-[30vw] ml-3 px-6"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan lectus vitae dui gravida molestie. Praesent justo tortor, placerat ac luctus non, lobortis condimentum ipsum.</p>
                </div>
                </div>
            </div>
    )
}

export default Post;