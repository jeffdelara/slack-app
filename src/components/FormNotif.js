const FormNotif = (props) => {
    // danger or success
    const { messageType, message } = props;

    return (
        <div className={messageType}>
            {message}
        </div>
    )
}

export default FormNotif;
