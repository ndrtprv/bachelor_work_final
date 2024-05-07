function Carousel(props) {

    return (
        <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item">
                    <svg className="bd-placeholder-img img-uaf" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={props.uaf_help} width="100%" height="100%" /></svg>
                    <div className="container">
                        <div className="carousel-caption text-start">
                            <h1 className='d-inline-block mb-1 mont'>Допомога ЗСУ</h1>
                            <p className='rob carous'>Підтримка Збройних Сил України є важливим вкладом у забезпечення національної безпеки та суверенітету, а також наближає перемогу у війні з агресором.</p>
                            <p className='rob-btn'><a className="btn btn-lg btn-primary" href="/">Підтримати ЗСУ</a></p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active">
                    <svg className="bd-placeholder-img img-hum" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={props.humanitarian} width="100%" height="100%" /></svg>
                    <div className="container">
                        <div className="carousel-caption">
                            <h1 className='d-inline-block mb-1 mont'>Гуманітарна допомога</h1>
                            <p className='rob carous'>Наша спільна діяльність спрямована на полегшення страждань та покращення умов тих, хто потребує допомоги, у тому числі постраждалим від війни.</p>
                            <p className='rob-btn'><a className="btn btn-lg btn-primary" href="/">Пожертвувати</a></p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <svg className="bd-placeholder-img img-vol" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={props.volunteer} width="100%" height="100%" /></svg>
                    <div className="container">
                        <div className="carousel-caption text-end">
                            <h1 className='d-inline-block mb-1 mont'>Стати волонтером</h1>
                            <p className='rob carous'>Бажаєш також допомагати постраждалим від війни або Збройним Силам? Тоді долучайся до нашої команди волонтерів! Заповнюй анкету і стань одним з нас.</p>
                            <p className='rob-btn'><a className="btn btn-lg btn-primary" href="/">Приєднатися зараз</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Попередній</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Наступний</span>
            </button>
        </div>
    );
}

export default Carousel;