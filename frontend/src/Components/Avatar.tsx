const Avatar = ({authorName, size} : {authorName: string, size: 'small' | 'big'}) => {

    return <div className={`${size === 'big' ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-gray-700 text-white p-2 flex justify-center items-center`}>{authorName.charAt(0)}</div>
}

export default Avatar;