import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { useGetProductsQuery } from '../../../services/product'
import Banner from '../banner'
import Contact from '../contact'


type Props = {}

const ProductList = (props: Props) => {
    const { pathname } = useLocation()
    const [productsfirst, setproductsfirst] = useState([])
    const [ismore, setismore] = useState(false)

    const { data: products = [], isLoading, isError } = useGetProductsQuery()
    useEffect(() => {
        if (products.length <= 10) {
            setproductsfirst(products)
        } else {
            setproductsfirst(products.slice(0, 12))
        }
    }, [products])

    if (isLoading) {
        return (
            <div>
                Loading ...
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                Error
            </div>
        )
    }
    return (
        <div>
            {pathname != "/products" && <Banner />}
            <section className="bg-white py-8">
                <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                    <nav id="store" className="w-full z-30 top-0 px-6 py-1">
                        <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                            <a className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
                                Store
                            </a>
                            <div className="flex items-center" id="store-nav-content">
                                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                    <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                                    </svg>
                                </a>
                                <a className="pl-3 inline-block no-underline hover:text-black" href="#">
                                    <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </nav>

                    {!ismore && productsfirst.map((item: any) => (
                        <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                            <Link to={`product/${item.id}/detail`} >
                                <img className="hover:grow hover:shadow-lg rounded-lg" src={item.img} style={{ width: "450px", height: "300px" }} />
                                <div className="items-center justify-center text-center pt-10 flex font-bold text-xl">
                                    <p>{item.name}</p>
                                </div>
                                <p className="pt-1 text-red-600 text-2xl font-bold text-center">{item.price ? item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : ""}</p>
                            </Link>
                        </div>
                    ))
                    }
                    {
                        ismore && products.map((item: any) => (
                            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                                <Link to={`product/${item.id}/detail`} >
                                    <img className="hover:grow hover:shadow-lg rounded-lg" src={item.img} style={{ width: "450px", height: "300px" }} />
                                    <div className="items-center justify-center text-center pt-10 flex font-bold text-xl">
                                        <p>{item.name}</p>
                                    </div>
                                    <p className="pt-1 text-red-600 text-2xl font-bold text-center">{item.price ? item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : ""}</p>
                                </Link>
                            </div>
                        ))
                    }
                </div >

                {products.length > 10 && !ismore && <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent text-xl rounded ml-[1000px]' onClick={() => setismore(true)}>More...</button>}

            </section >
            {pathname != "/products" && <Contact />}
        </div >
    )
}
export default ProductList