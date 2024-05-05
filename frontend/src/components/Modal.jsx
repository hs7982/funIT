export const Modal = ({title, message}) => {
    return (
        <dialog id="modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">닫기</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};