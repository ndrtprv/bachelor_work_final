function Feedback() {
    return (
        <div>
            <form action="/" method="post" id="form-box" className="p-2">
                <div className="form-group input-group mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                    </div>
                    <input type="text" name="name" className="form-control" placeholder="Введіть ваше ім'я" required />
                </div>

                <div className="form-group input-group mt-2 mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    </div>
                    <input type="email" name="email" className="form-control" placeholder="Введіть ваш email" required />
                </div>

                <div className="form-group input-group mt-2 mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-at"></i></span>
                    </div>
                    <input type="text" name="subject" className="form-control" placeholder="Тема листа" required />
                </div>

                <div className="form-group input-group mt-2 mb-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-comment-alt"></i></span>
                    </div>
                    <textarea name="msg" id="msg" className="form-control" placeholder="Ваше повідомлення..." cols="30" rows="4" required></textarea>
                </div>
        
                <div className="form-group mt-2">
                    <input type="submit" name="submit" id="submit" className="btn btn-primary btn-block" value="Відправити" />
                </div>
            </form>
        </div>
    );
}

export default Feedback;