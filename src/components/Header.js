import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch,useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { auth,provider } from "../firebase";
import { selectUserName,selectUserEmail,selectUserPhoto, setUserLoginDetails,setSignOutState } from "../features/user/userSlice";



const Header = (props) => {

    const  dispatch=useDispatch();
    const history=useHistory();
    const userName= useSelector(selectUserName);
    const userEmail= useSelector(selectUserEmail);
    const userPhoto= useSelector(selectUserPhoto);


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user);
            history.push("/home");
          }
        });
      }, [userName]);

    const handleAuth=()=>{
        if (!userName) {
        auth.signInWithPopup(provider).then((result) =>{
            setUser(result.user)
        }).catch((error) =>{
            alert(error.message);
        });
    }
    else if (userName) {
        auth
          .signOut()
          .then(() => {
            dispatch(setSignOutState());
            history.push("/");
          }).catch((err) => alert(err.message));
      }
    };
    
    

    const setUser=(user)=>{
        dispatch(setUserLoginDetails({
            name:user.displayName,
            email:user.email,
            photo: user.photoURL,
        }))
    }

    return(
        <Nav>
            <Logo src="/images/logo.svg" />

            {
                !userName ? 
                <LoginContainer>
                    <Login onClick={handleAuth}>
                    LOGIN
                    </Login>
                </LoginContainer>
                
                :
                <>
            <NavMenu >
                <a>
                    <img src="/images/home-icon.svg"/>
                    <span>HOME</span>
                </a>
                <a>
                    <img src="/images/search-icon.svg"/>
                    <span>SEARCH</span>
                </a>
                <a>
                    <img src="/images/watchlist-icon.svg"/>
                    <span>WATCHLIST</span>
                </a>
                <a>
                    <img src="/images/original-icon.svg"/>
                    <span>ORIGINALS</span>
                </a>
                <a>
                    <img src="/images/movie-icon.svg"/>
                    <span>MOVIES</span>
                </a>
                <a>
                    <img src="/images/series-icon.svg"/>
                    <span>SERIES</span>
                </a>
            </NavMenu >
            <SignOut>
            <UserImg   src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
            </>}
        </Nav>
    )
};



const Nav=styled.nav`
    
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow:hidden;
    justify-content: space-between;
    `

const Logo=styled.img`
    width: 80px;

`

const NavMenu=styled.div`
    display: flex;
    flex-flow: row nowrap;
    
    margin-left:25px;
    align-items: center;
    
    margin: 0px;
    padding: 0px;
    position: relative;
    margin-right: auto;
    margin-left: 25px;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img{
            height: 20px;
        }

        span{
            font-size:13px;
            letter-spacing:1.42px;
            position: relative;
            white-space: nowrap;

            &:before{
                content: "";
                height: 2px;
                background: white;
                position: absolute; 
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                transform: scaleX(0);
                
            }
        }

        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg=styled.img`
    height: 100%;
    cursor: pointer;

` 

const Login=styled.a`
   background-color: rgba(0,0,0,0.6);
   padding: 8px 16px;
   text-transform: uppercase;
   letter-spacing:1.8px;
   border: 1px solid #f9f9f9;
   border-radius:4px;
   transition: all 250ms ease 0s;
   cursor:pointer;

   &:hover{
       background-color:#f9f9f9;
       color:#000;
       border-color:transparent;
   }
`
const LoginContainer=styled.div`
        flex: 1;
        display:flex;
        justify-content: flex-end;
`

const DropDown = styled.div`
  position: float;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
      
    }
  }
`;


export default Header;