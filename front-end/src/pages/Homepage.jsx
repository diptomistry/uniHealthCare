import React from 'react'
import { Navbar, Home, About, Doctors, Blogs, Footer,TabsWithIcon} from '../components/homepage'

const Homepage = () => {
  return (
<div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>
        <div id="dutyRoster">
          <TabsWithIcon/>
        </div>

       

        <div id="doctors">
          <Doctors />
        </div>

        <div id="blog">
          <Blogs />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Homepage