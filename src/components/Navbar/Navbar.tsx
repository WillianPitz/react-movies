import { Heart, MagnifyingGlass, ShoppingCart } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

type NavbarProps = {
  onChange: (e: any) => void;
  itemsInCart?: number;
  onClickCart: () => void;
  onClickHeart: () => void;
};

const Navbar = ({
  onChange,
  itemsInCart,
  onClickCart,
  onClickHeart,
}: NavbarProps) => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-3 px-23 bg-[#8DD7CF]">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <p
          onClick={() => navigate("/")}
          className=" cursor-pointer font-bold text-[#FFFFFF]"
        >
          LOGO
        </p>
      </motion.div>

      <div className="flex items-center relative">
        <MagnifyingGlass
          size={20}
          weight="regular"
          className="absolute right-2"
        />
        <input
          type="text"
          placeholder="Pesquisa"
          className="text-slate-800 text-base font-medium md:w-96 md:h-8 outline-none indent-2 border-solid border-2 border-[#9EADBA] rounded-sm placeholder:font-semibold placeholder:text-[#C3CFD9]"
          onChange={onChange}
        />
      </div>

      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Heart
            data-cy="navbar-heart"
            size={30}
            color="#FFFFFF"
            weight="fill"
            className="cursor-pointer"
            onClick={onClickHeart}
          />
        </motion.button>
        <div className="flex">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ShoppingCart
              data-cy="navbar-cart"
              className="cursor-pointer"
              size={30}
              color="#FFFFFF"
              weight="fill"
              onClick={onClickCart}
            />
          </motion.button>
          {itemsInCart ? (
            <div className="flex absolute right-[2px] top-[2px] bg-[#FBE192] items-center rounded-full w-6 justify-center">
              <p>{itemsInCart}</p>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
