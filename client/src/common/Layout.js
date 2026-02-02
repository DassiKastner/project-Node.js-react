import {Outlet} from "react-router-dom"
import Navigate from "./Navigate"
import Footer from "./Footer"
import ScrollToTop from "./ScrollToTop"

const Layout = ()=>{
    return <div className="page">
            <ScrollToTop />
            <header><Navigate/></header>
            <main>
                <Outlet />
            </main>
            <footer>
                <Footer/>
            </footer>
    </div>
}

export default Layout