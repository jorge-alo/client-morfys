import '../../../styles/CategorySection.css';
import { useRef } from 'react';

export const CategorySection = ({ comidas }) => {
    const categories = [...new Set(comidas.map(comida => comida.categoria))];
    const sliderRef = useRef(null);
    
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft = sliderRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown = false;
    };

    const handleMouseUp = () => {
        isDown = false;
    };

    const handleMouseMove = (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Ajusta la velocidad del desplazamiento
        sliderRef.current.scrollLeft = scrollLeft - walk;
    };
    return (
        <section className="section-container-category">
            <h4>Categorias</h4>
                <div 
                    ref={sliderRef}
                    className='container-category'
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={(e) => {
                        startX = e.touches[0].pageX - sliderRef.current.offsetLeft;
                        scrollLeft = sliderRef.current.scrollLeft;
                    }}
                    onTouchMove={(e) => {
                        const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
                        const walk = (x - startX) * 2;
                        sliderRef.current.scrollLeft = scrollLeft - walk;
                    }}>
                    {
                        categories.map((category, index) => (
                            <div key={index} className='container-category__item'>
                                <a href={`#${category.replace(/\s+/g, '-')} `} >
                                    <h5>{category}</h5>
                                </a>
                            </div>
                        ))
                    }
                </div>          
        </section>
    )
}
