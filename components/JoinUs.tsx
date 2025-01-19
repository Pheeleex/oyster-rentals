import Link from "next/link"

const JoinUs = () => {
    return(
        <div className="p-4">
            <h1 className='text-xl text-blue-700 mb-4 font-extrabold'>Create an account with us</h1>
            <p className="font-bold">Enjoy benefits like</p>
            <ul className="my-4 flex flex-col gap-2">
                <li>Trade in offers</li>
                <li>24/7 repair servicing and maintenance support</li>
                <li>Custom requests for cars and car part</li>
                <li>Exciting community of avid car lovers</li>
            </ul>
            <Link href='/clients/sign-in' className='bg-blue-800 text-white rounded p-2 mt-8'>Sign up Now</Link>
        </div>
    )
}
export default JoinUs