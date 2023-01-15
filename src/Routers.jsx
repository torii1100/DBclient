import { BrowserRouter, Routes, Route } from "react-router-dom";
import  DisplayWord from "./components/DisplayWord";
import  SendWord  from "./components/SendWord";

const Routers=()=>{
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<SendWord/>}/>
            <Route path="/DisplayWord" element={<DisplayWord/>}/>
        </Routes>
        </BrowserRouter>
    );
}
export default Routers