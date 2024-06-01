import { NavLink } from "react-router-dom";
import { FUNDRAISINGS_ROUTE, SIGNUP_ROUTE } from "../../utils/constants";
import { Carousel, CarouselCaption, CarouselItem, Container } from "react-bootstrap";
import { useState } from "react";

function LandingCarousel(props) {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel id="myCarousel" className="slide" data-bs-ride="carousel" activeIndex={index} onSelect={handleSelect}>
            <CarouselItem >
                <svg className="bd-placeholder-img img-uaf" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={props.uaf_help} width="100%" height="100%" /></svg>
                <Container >
                    <CarouselCaption className="text-start">
                        <h1 className='d-inline-block mb-1 mont'>Допомога ЗСУ</h1>
                        <p className='rob carous'>Підтримка Збройних Сил України є важливим вкладом у забезпечення національної безпеки та суверенітету, а також наближає перемогу у війні з агресором.</p>
                        <p className='rob-btn'><NavLink className="btn btn-lg btn-primary" to={FUNDRAISINGS_ROUTE} >Підтримати ЗСУ</NavLink></p>
                    </CarouselCaption>
                </Container>
            </CarouselItem>
            <CarouselItem >
                <svg className="bd-placeholder-img img-hum" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={props.humanitarian} width="100%" height="100%" /></svg>
                <Container >
                    <CarouselCaption >
                        <h1 className='d-inline-block mb-1 mont'>Гуманітарна допомога</h1>
                        <p className='rob carous'>Наша спільна діяльність спрямована на покращення умов тих, хто потребує допомоги, у тому числі постраждалим від війни.</p>
                        <p className='rob-btn'><NavLink className="btn btn-lg btn-primary" to={FUNDRAISINGS_ROUTE} >Пожертвувати</NavLink></p>
                    </CarouselCaption>
                </Container>
            </CarouselItem>
            <CarouselItem >
                <svg className="bd-placeholder-img img-vol" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><image href={props.volunteer} width="100%" height="100%" /></svg>
                <Container >
                    <CarouselCaption className="text-end">
                        <h1 className='d-inline-block mb-1 mont'>Стати волонтером</h1>
                        <p className='rob carous'>Бажаєш також допомагати постраждалим від війни або Збройним Силам? Тоді долучайся до нашої команди волонтерів! Заповнюй анкету і стань одним з нас.</p>
                        <p className='rob-btn'><NavLink className="btn btn-lg btn-primary" to={SIGNUP_ROUTE} >Приєднатися зараз</NavLink></p>
                    </CarouselCaption>
                </Container>
            </CarouselItem>
        </Carousel>
    );
}

export default LandingCarousel;