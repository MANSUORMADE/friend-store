import allimg from "../../assets/img";
import HeaderBox from "../headerBox/HeaderBox";
import "./testBox.scss"
const TestBox = ()=> {
    const data = [
        {
            img: allimg.test.binanset,
            title: "binanset"
        },
        {
            img: allimg.test.clashofclans,
            title: "clashofclans"
        },
        {
            img: allimg.test.clashroyal,
            title: "clashroyal"
        },
        {
            img: allimg.test.freefire,
            title: "freefire"
        },
        {
            img: allimg.test.news,
            title: "news"
        },
        {
            img: allimg.test.pobg,
            title: "pobg"
        },
        {
            img: allimg.test.truns,
            title: "truns"
        },
        {
            img: allimg.test.usdt,
            title: "usdt"
        },
        {
            img: allimg.test.ylalido,
            title: "ylalido"
        },
    ]
    return (
        <div className="test-box">
            <HeaderBox/>
            <div className="info">
                {data && data.map((e,i)=>(
                    <div key={i} className="box">
                        <div className="img"><img src={e.img || allimg.noimg} /></div>
                        <div>{e.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default TestBox;