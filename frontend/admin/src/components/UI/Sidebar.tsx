import { useState } from "react";
import { Home, Users, Package, Layers, ShoppingCart, Menu } from "lucide-react";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        { name: "Dashboard", icon: <Home size={20} />, link: "/dashboard" },
        { name: "Users", icon: <Users size={20} />, link: "/users" },
        { name: "Products", icon: <Package size={20} />, link: "/products" },
        { name: "Categories", icon: <Layers size={20} />, link: "/categories" },
        { name: "Orders", icon: <ShoppingCart size={20} />, link: "/orders" },
    ];

    return (
        <div
            className={`h-screen bg-gray-900 text-white p-5 transition-all ${
                isOpen ? "w-64" : "w-20"
            }`}
        >
            {/* Кнопка открытия/закрытия */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-400 hover:text-white mb-5"
            >
                <Menu size={24} />
            </button>

            {/* Лого */}
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-500 rounded-md" />
                {isOpen && <span className="text-lg font-semibold">Admin Panel</span>}
            </div>

            {/* Меню */}
            <nav className="space-y-4">
                {menuItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.link}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-md transition"
                    >
                        {item.icon}
                        {isOpen && <span>{item.name}</span>}
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default SideBar;
