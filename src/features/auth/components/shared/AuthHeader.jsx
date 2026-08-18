const AuthHeader = ({ head, paragraph }) => {
    return (
        <div className="text-center">
            <h1 className="font-bold text-[26px]">{head}</h1>
            <p className="text-sm text-slate-600 pt-2">{paragraph}</p>
        </div>
    )
}

export default AuthHeader