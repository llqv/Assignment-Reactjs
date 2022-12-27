import React from 'react'

type Props = {}

const Banner = (props: Props) => {
    return (
        <div>
            <div id="carouselDarkVariant" className="carousel slide carousel-fade carousel-dark relative" data-bs-ride="carousel">
                <div className="carousel-inner relative w-full overflow-hidden">
                    {/* Single item */}
                    <div className="carousel-item active relative float-left w-full">
                        <img src="http://mauweb.monamedia.net/nike/wp-content/uploads/2018/03/031218_AM18093_HP_StaticOption.jpg" className="block w-full" alt="Motorbike Smoke" />
                        <div className="carousel-caption hidden md:block absolute text-center">
                            <h5 className="text-xl">First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Banner