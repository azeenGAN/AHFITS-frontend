import { motion } from 'framer-motion'

const logos = [
  { src: '/stable/images/ourclient1.svg', alt: 'Company 1' },
  { src: '/stable/images/ourclient2.svg', alt: 'Company 2' },
  { src: '/stable/images/ourclient3.svg', alt: 'Company 3' },
  { src: '/stable/images/ourclient4.svg', alt: 'Company 4' },
  { src: '/stable/images/ourclient5.svg', alt: 'Company 5' },
  { src: '/stable/images/ourclient6.svg', alt: 'Company 6' },
  { src: '/stable/images/ourclient7.svg', alt: 'Company 7' },
  { src: '/stable/images/ourclient8.svg', alt: 'Company 8' },
  { src: '/stable/images/ourclient9.svg', alt: 'Company 9' },
  { src: '/stable/images/ourclient10.svg', alt: 'Company 10' },
  { src: '/stable/images/ourclient11.svg', alt: 'Company 11' },
  { src: '/stable/images/ourclient12.svg', alt: 'Company 12' },
]


const longlogos= new Array(...logos, ...logos, ...logos, ...logos, ...logos)
let lefttoright = {
  hidden: {
    x: 10,  // Start off-screen to the right
  },
  visible: {
    x: '-550vw',  // Move off-screen to the left
    transition: {
      x: {
        duration: 100,  // Duration of the movement
        repeat: Infinity,  // Repeat infinitely
        repeatType: 'reverse',  // Loop the movement
        ease: 'linear',  // Smooth continuous movement
        
      },
    },
  },
}

export function LogoCloud() {
  return (
    <div className="w-full bg-black  text-white overflow-hidden">
      <h2 className="text-3xl bg-zinc-900 font-bold tracking-tighter sm:text-5xl text-center pb-8 pt-5">Our Clients</h2>
      <div className="container px-4 md:px-6 py-3">
        <div
          
          className="flex space-x-16 w-full "
          aria-hidden="true"
        >
          {longlogos.map((logo, index) => (
            <motion.div
              variants={lefttoright}
              initial="hidden"
              animate="visible"
              key={index}
              className="flex items-center justify-center aspect-square h-[150px] "
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain filter grayscale opacity-80 bg-transparent aspect-[4/3] w-[150px]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
