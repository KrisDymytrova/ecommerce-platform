import { User, Heart, ShoppingBag } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/assets/logo.svg";
import SearchBar from "../UI/SearchBar";

const TopHeader = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    return (
        <header className="header">
            <div className="flex items-center gap-10 cursor-pointer" onClick={goToHome}>
                <img src={logo} alt="Logo" className="h-24 w-auto" />
                <span className="logo">the Elsho</span>
            </div>
            <div className="flex items-center gap-10">
                <SearchBar />
                <div className="icon-group">
                    <User size={24} className="icon" onClick={goToLogin}/>
                    <Heart size={24} className="icon" />
                    <div className="relative" onClick={goToCart}>
                        <ShoppingBag size={24} className="icon" />
                        <span className="cart-badge">0</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
