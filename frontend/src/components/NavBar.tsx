import React from 'react'
import {Link} from 'react-router-dom'


interface NavBarItemProps {
    title: string,
    to: string
}

const NavBarItem: React.FC<NavBarItemProps> = ({title, to}) => {
    return (
        <Link
            to={to}
            className="ml-2 text-2xl font-bold text-white hover:text-black p-4 rounded-xl hover:bg-white"
        >
            {title}
        </Link>
    )
}


const NavBar: React.FC = () => {


    return (
        <div className="flex justify-between  bg-black py-6 fixed top-0 w-full z-30 shadow">
            <div className="text-white text-2xl font-bold ml-4">Hi, Florian</div>
            <nav>
                <NavBarItem title={"Playground"} to={"/"}/>
                <NavBarItem title={"Challenges"} to={"/construction"}/>
                <NavBarItem title={"Learn"} to={"/construction"}/>
            </nav>
            <button className="bg-white rounded-lg p-2 text-black font-bold mr-2">Logout</button>
        </div>

    )
}

export default NavBar
