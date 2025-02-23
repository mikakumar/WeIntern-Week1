

const MakePost = () =>{
    return(
        <>
        <div>
            <form action="" className="border-2 border-black w-[100%] h-[87 vh]">
                <input type="text" className="rounded-md w-[100%] h-[8vh]  mt-4 bg-gray-300 pl-12 border border-gray-100 focus:bg-transparent placeholder:text-black inset-0" placeholder="Title" name="Title" id="" />
                <input type="text" name="summary"  id="" />
                <input type="file" name="photo" id="" />
            </form>
        </div>
        </>
    )
}

export default MakePost;