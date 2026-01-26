import allimg from "../../assets/img"
import "./HeaderBox.scss"
const HeaderBox = ()=> {
    return( 
        <div className="header-box">
            <div className="img">
                <img src={allimg.test.news} alt="img" />
            </div>
        </div>
    )
}
export default HeaderBox