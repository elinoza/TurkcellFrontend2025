"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetBlog, setSearchTermRedux } from "../../../redux/slices/blogSlice";
import {
  registerWithGoogle,
  signOut,
} from "../../../../../firebase/authControl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { unsubscribe } from "../../../../../services/authServices";
import Button from "../../atoms/buttons/Button";
import UpdateModal from "../modal/UpdateModal";
import AddModal from "../modal/AddModal";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userAuth, setUserAuth] = useState(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const dispatch = useDispatch();
  const handleModalOpen = () => {
    dispatch(resetBlog());
  };
  function handleSearch(e) {
    e.preventDefault();
    dispatch(setSearchTermRedux(searchTerm));
  }
  useEffect(() => {
    unsubscribe(setUserAuth);
  }, []);
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link
          href={`/`}
          className="navbar-brand d-flex gap-2 align-items-center"
        >
          <Image width={200} height={50} src="/logo1.PNG" alt="logo" />
        </Link>

        <form className="d-flex" role="search">
          <input
            className="form-control me-2 rounded-pill"
            type="search"
            placeholder="Ara"
            aria-label="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            onClick={handleSearch}
            className="btn btn-outline-light rounded-pill text-dark"
            type="submit"
          >
            Ara
          </Button>
        </form>

        {userAuth ? (
          <div className="d-flex gap-4 align-items-center">
            {!isHomePage ? (
              <Button
                type="button"
                className="btn btn-outline-success rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#addModal"
                onClick={handleModalOpen}
              >
                ☄️ Blog Ekle
              </Button>
            ) : (
              <></>
            )}
            <UpdateModal />
            <AddModal />
            <Link
              href={`/userPage`}
              className="text-decoration-none d-flex gap-2 align-items-center"
            >
              <Button className="btn btn-outline-light rounded-pill text-dark">
                Yazılarım
              </Button>
            </Link>
            <Link
              className="btn btn-danger rounded-pill"
              href={`/`}
              onClick={signOut}
            >
              SignOut
            </Link>
          </div>
        ) : (
          <Link
            className="btn btn-outline-dark rounded-pill"
            href={`/userPage`}
            onClick={registerWithGoogle}
          >
            SignIn
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
