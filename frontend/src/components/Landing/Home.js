import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel'
import Card from './Cards'
import Footer from './Footer'


export const Home = () => {
  return (
    <>
        <Navbar userData={{name:""}}/>
        <Carousel/>
        <Card />
        <Footer/>
    </>
  )
}
export default Home;