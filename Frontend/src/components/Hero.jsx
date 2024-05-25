import React from 'react';
import { discount, robot } from '../assets';
import styles from "../style";
import GetStarted from "./GetStarted";
import "../circle.css";


const Hero = () => {
  return (

    // use id=home as we want to add scroll and we can control DOM elements through id

    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For{" "}
            <span className="text-white"> 1 Month</span> Account
          </p>
        </div>

        <div className='flex flex-row
        justify-between items-center w-full'>
{/* Use flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size  */}

          <h1 className='flex-1 font-poppins
          font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]'>
            The Next <br className='sm:block
            hidden'/> {" "}
            <span className='text-gradient'>Generation</span> {" "}
          </h1>
          <div className='ss:flex hidden md:mr-4 mr-0'>
            <GetStarted/>
          </div>
        </div>
        <h1 className='font-poppins
        font-semibold ss:text-[68px] text-[52px]
        text-white ss:leading-[100px] leading-[75px] w-full'>
        Payment Method.</h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>Our team of experts uses a methodology to identify
        the credit cards most likely to fit your needs. 
        We examine annual percentage rates, annual fees.</p>
 
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        {/* z-[5] because we wan tout robot image to appear on top of gradient */}
        {/* <img src={robot} alt="billing" className='w-[100%] relative z-[5]'/>} */}
        <div className="relative z-[5] w-[100%] ">
        <ol reversed className="paces" lang="en">
  <li className="pace js">
    JS+
    <blockquote className="quote js">
      JS+: The JavaScript ecosystem (not the language!): Anyone else feels overwhelmed by the rate of rapid changes here?
    </blockquote>
  </li>
  <li className="pace css">
    CSS
    <blockquote className="quote css">
      CSS: This is moving in a nice click lately, with lots of useful new stuff enabled in the browsers.
    </blockquote>
  </li>
  <li className="pace html">
    HTML
    <blockquote className="quote html">
      HTML: Started with 20 something "tags", now we have over 100 "elements", but I feel that I've been able to keep up with the pace of change here.
    </blockquote>
  </li>
  <li className="pace url">
    URLs
    <blockquote className="quote url">
      URLs: Sadly they are frequently changing; links die. We should work hard to keep URLs unchanged, but that's not how it is.
    </blockquote>
  </li>
  <li className="pace http">
    HTTP
    <blockquote className="quote http">
      HTTP: Gradually changed (http/2), but it kind of feels good that it doesn't constantly change underneath us.
    </blockquote>
  </li>
  <li className="pace tcpip">
    TCP/IP
    <blockquote className="quote tcpip">
      TCP/IP: Deliberately dumb, simple, all it does is move packets around.
    </blockquote>
  </li>
</ol>
          </div>
        

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}

      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted/>
      </div>

    </section>
  )
}

export default Hero